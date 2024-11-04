import {Request,Response} from 'express'
import prismaClient from '../config/prisma'
import httpStatus from 'http-status'
import type {
    Lead,TypedRequest,PagedQuery
}from '../interface/interface'
import { ITokenData} from "../interface/interface";

export const handleCreateLead = async (req: Request, res: Response) => {
  try {
    // Extract required fields from request body
    const {
      first_name,
      last_name,
      email_id,
      phone_no,
      JobType,
      ServiceType,
      MoveDate,
      MoveTime,
      LoadingCity,
      UnloadingCity,
      company_id,
    } = req.body;

    // Validate if all required fields are present
    if (
      !first_name ||
      !last_name ||
      !email_id ||
      !phone_no ||
      !JobType ||
      !ServiceType ||
      !MoveDate ||
      !MoveTime ||
      !LoadingCity||
      !UnloadingCity 
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Ensure the user is authenticated (from the `isAuth` middleware)
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized. User is not authenticated.' });
    }

    // Prepare lead data
    const leadData: Lead = {
      first_name,
      last_name,
      email: email_id,
      phone: phone_no,
      JobType,
      ServiceType,
      MoveDate,
      MoveTime,
      LoadingCity,
      UnloadingCity,
      company_id: company_id ? parseInt(company_id, 10) : user.company_id, // Use user's company_id if not provided
    };

    // Create the lead in the database
    const newLead = await prismaClient.tbl_leads.create({
      data: leadData,
    });

    // Return the newly created lead
    return res.status(201).json(newLead);

  } catch (error: any) {
    console.error('Error creating lead:', error);
    return res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};



export const handleGetAllLeads = async (req: TypedRequest, res: Response) => {
    try {
        const user = req.user as ITokenData;
        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized. User is not authenticated.' });
        }
        const leadFilter: { company_id?: number } = {};
        if (user.user_role === 'tenant_admin') {
            leadFilter.company_id = user.company_id; 
        }
     
        const leads = await prismaClient.tbl_leads.findMany({
            where: leadFilter,
            select: {
                first_name: true,
                last_name: true,
                email: true,
                phone: true,
                JobType: true,
                ServiceType: true,
                MoveDate: true,
                MoveTime: true,
                LoadingCity: true,
                UnloadingCity: true,
                company_id: true,
                lead_status:true
            },
        });

        if (!leads || leads.length === 0) {
            return res.status(httpStatus.OK).json({ message: 'No leads found for the specified criteria.' });
        }


        return res.status(httpStatus.OK).json(leads);

    } catch (error: any) {
        console.error('Error fetching leads:', error);

    
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error.', error: error.message });
    }
};


  export const handleGetLeadById = async (req: Request, res: Response) => {
    try {
        // Extract the lead ID and user's company_id from the request
        const leadId = parseInt(req.params.id, 10);
        const user = req.user; // Assuming `req.user` is populated by an authentication middleware

        // Check if the user is authenticated and has a company_id
        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
        }

        // Validate the lead ID
        if (isNaN(leadId)) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid lead ID' });
        }

        // Fetch the lead by ID and company_id
        const lead = await prismaClient.tbl_leads.findFirst({
            where: {
                id: leadId,
                // If the user is a super admin, do not filter by company_id
                ...(user.user_role === "super_admin" ? {} : { company_id: user.company_id }),
            },
        });

        // If no lead is found or the company_id doesn't match
        if (!lead) {
            return res.status(httpStatus.OK).json({ message: 'Lead not found FOR THE SPECIFIED ID' });
        }

        // Respond with the lead data
        res.status(httpStatus.OK).json(lead);
    } catch (error: any) {
        console.error('Error fetching lead by ID:', error);

        // Handle internal server errors
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: 'Internal server error', error: error.message });
    }
};

export const handleGetLeadsByCompany = async (req: Request, res: Response) => {
    try {
        const { companyId } = req.params;

        // Check if the user is authenticated
        const user = req.user;  // Assuming `req.user` is set by your authentication middleware
        if (!user || !user.id) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                message: 'Unauthorized. User is not authenticated.'
            });
        }

        // Validate companyId
        const parsedCompanyId = parseInt(companyId, 10);
        if (isNaN(parsedCompanyId) || parsedCompanyId <= 0) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Invalid company ID. Company ID must be a positive number.'
            });
        }

        // Authorization check: Verify if the authenticated user is authorized to fetch leads for this company
        if (user.user_role === "tenant_admin" && user.company_id !== parsedCompanyId) {
            return res.status(httpStatus.FORBIDDEN).json({
                success: false,
                message: 'Access denied. You are not authorized to view leads for this company.'
            });
        }
        const leads = await prismaClient.tbl_leads.findMany({
            where: {
                company_id: parsedCompanyId,
            },
            select: {
                id: true,
                company_id: true,
                first_name: true,
                last_name: true,
                phone: true,
                email: true,
                JobType: true,
                ServiceType: true,
                MoveDate: true,
                MoveTime: true,
                EstimatedDate: true,
                EstimatedTime: true,
                insert_time: true,
                distance: true,
                lead_status: true,
                book_date: true,
                complete_date: true,
                accept_status: true,
                reject_reason: true,
            },
        });

        // Handle case where no leads are found
        if (leads.length === 0) {
            return res.status(httpStatus.OK).json({
                success: false,
                message: 'No leads found for the specified company.'
            });
        }

        // Return leads data if found
        return res.status(httpStatus.OK).json({
            success: true,
            data: leads
        });

    } catch (error: any) {
        // Log the error and return a generic error message
        console.error('Error fetching leads for company:', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error. Could not fetch leads for the specified company.'
        });
    }
};

export const handleDeleteLead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Check if the user is authenticated
        const user = req.user; // Assuming `req.user` is set by your authentication middleware
        if (!user || !user.id) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                message: 'Unauthorized. User is not authenticated.'
            });
        }

        // Validate if 'id' is a valid number
        const leadId = parseInt(id, 10);
        if (isNaN(leadId) || leadId <= 0) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Invalid lead ID. Lead ID must be a positive number.'
            });
        }

        // Check if the lead exists and belongs to the same company as the authenticated user
        const lead = await prismaClient.tbl_leads.findUnique({
            where: { id: leadId },
            select: { id: true, company_id: true }
        });

        if (!lead) {
            return res.status(httpStatus.OK).json({
                success: false,
                message: 'Lead not found.'
            });
        }

        // Check if the lead belongs to the authenticated user's company
        if (lead.company_id !== user.company_id) {
            return res.status(httpStatus.FORBIDDEN).json({
                success: false,
                message: 'Access denied. You are not authorized to delete this lead.'
            });
        }

        // Proceed to delete the lead if all checks pass
        await prismaClient.tbl_leads.delete({
            where: { id: leadId }
        });

        // Return a 204 No Content status for a successful deletion
        return res.status(httpStatus.NO_CONTENT).send();
        
    } catch (error: any) {
        console.error('Error deleting lead:', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: `Error deleting lead: ${error.message}`
        });
    }
};

export const handleUpdateLead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = req.user; // Assuming `req.user` is set by your authentication middleware

        // Validate if 'id' is a valid number
        const leadId = parseInt(id, 10);
        if (isNaN(leadId)) {
            return res.status(400).json({ message: 'Invalid lead ID.' });
        }

        // Validate if the user is authorized to update the lead
        const existingLead = await prismaClient.tbl_leads.findUnique({
            where: { id: leadId },
            select: { company_id: true } // Only select the company_id for authorization check
        });

        if (!existingLead) {
            return res.status(200).json({ message: 'Lead not found.' });
        }

        // Check if the lead belongs to the user's company
        if (existingLead.company_id !== user.company_id) { // Assuming `user.company_id` is available
            return res.status(403).json({ message: 'You are not authorized to update this lead.' });
        }

        // Extract data from the request body
        const {
            first_name,
            last_name,
            email_id,
            phone_no,
            JobType,
            ServiceType,
            MoveDate,
            MoveTime,
            LoadingCity,
            UnloadingCity ,
            company_id // Optional field
        }= req.body;

        // Check if required fields are present
        if (!first_name || !last_name || !email_id || !phone_no || !JobType || !ServiceType || !MoveDate || !MoveTime || !LoadingCity) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        // Prepare the data for update
        const updateData: Lead = {
            first_name,
            last_name,
            email: email_id,
            phone: phone_no,
            JobType,
            ServiceType,
            MoveDate,
            MoveTime,
            LoadingCity,
            UnloadingCity,
            company_id: company_id ? parseInt(company_id, 10) : user.company_id
        };

        // Update the lead in the database
        const updatedLead = await prismaClient.tbl_leads.update({
            where: { id: leadId },
            data: updateData
        });

        // Send back the updated lead
        res.status(200).json(updatedLead);
    } catch (error) {
        console.error('Error updating lead:', error);
        res.status(500).json({ message: 'Internal server error.', error});
    }
};



const buildWhereClause = (query: Record<string, any>) => {
    const { searchText, email, first_name, last_name, phone } = query;
    const where: Record<string, any> = {};

    // Adding search conditions
    if (searchText) {
        where.OR = [
            { email: { contains: searchText, mode: 'insensitive' } },
            { first_name: { contains: searchText, mode: 'insensitive' } },
            { last_name: { contains: searchText, mode: 'insensitive' } },
            { phone: { contains: searchText } },
        ];
    }

    // Adding individual filters
    if (email) where.email = { contains: email, mode: 'insensitive' };
    if (first_name) where.first_name = { contains: first_name, mode: 'insensitive' };
    if (last_name) where.last_name = { contains: last_name, mode: 'insensitive' };
    if (phone) where.phone = { contains: phone };

    return where;
};


export const handleGetPagedLead = async (req: Request, res: Response) => {
    try {
        // Check for user authentication
        const user= req.user; // Assuming req.user is set by your authentication middleware
        if (!user || !user.id || !user.company_id) {
            return res.status(401).json({ message: 'Unauthorized. User is not authenticated.' });
        }

        console.log("Query Parameters:", req.query);

        // Default values for pagination and sorting
        const pageIndex = parseInt(req.query.pageIndex as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        const orderBy = (req.query.orderBy as string) || 'id';
        const orderDirection = (req.query.orderDirection as string) || 'asc';

        // Calculate skip for pagination
        const skip = (pageIndex - 1) * pageSize;

        // Build where clause using the query parameters
        const whereClause = buildWhereClause(req.query);
        console.log("Where Clause:", whereClause);
        
        // Fetch leads and total count in a single transaction
        const [leads, total] = await prismaClient.$transaction([
            prismaClient.tbl_leads.findMany({
                where: {
                    ...whereClause,
                    company_id: user.company_id, // Ensure we only fetch leads for the user's company
                },
                skip,
                take: pageSize,
                orderBy: {
                    [orderBy]: orderDirection,
                },
                select: {
                    id: true,
                    company_id: true,
                    first_name: true,
                    last_name: true,
                    phone: true,
                    email: true,
                    JobType: true,
                    ServiceType: true,
                    MoveDate: true,
                    MoveTime: true,
                    EstimatedDate: true,
                    EstimatedTime: true,
                    insert_time: true,
                    distance: true,
                    lead_status: true,
                    book_date: true,
                    complete_date: true,
                    accept_status: true,
                    reject_reason: true,
                },
            }),
            prismaClient.tbl_leads.count({
                where: {
                    ...whereClause,
                    company_id: user.company_id, // Ensure we only count leads belonging to the user's company
                }
            }),
        ]);

        // Send response with leads and pagination info
        res.json({
            data: leads,
            total,
            pageIndex,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
        });
    } catch (error) {
        console.error('Error fetching paged leads:', error);
        res.status(500).json({ error: `Error fetching paged leads: ${(error as Error).message}` });
    }
};
