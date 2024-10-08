import {Request,Response} from 'express'
import prismaClient from '../config/prisma'
import httpStatus from 'http-status'
import type {
    Lead,TypedRequest,PagedQuery
}from '../interface/interface'


export const handleCreateLead = async (req: Request, res: Response) => {
    const {
      first_name,
      last_name,
      email_id,
      phone_no,
      JobType,
      ServiceType,
      MoveDate,
      MoveTime,
      LoadingCity, // Include all required fields from tbl_leads schema
      company_id,  // Optional field
    } = req.body;
  
    // Check if all required fields are present
    if (
      first_name &&
      last_name &&
      email_id &&
      phone_no &&
      JobType &&
      ServiceType &&
      MoveDate &&
      MoveTime &&
      LoadingCity // Ensure this required field is included
    ) {
      try {
        const leadData:Lead = {
          first_name,
          last_name,
          email: email_id,
          phone: phone_no,
          JobType,
          ServiceType,
          MoveDate,
          MoveTime,
          LoadingCity, // Required field
          company_id: company_id ? parseInt(company_id, 10) : undefined, // Optional field
        };
  
        // Create new lead in the database
        const newLead = await prismaClient.tbl_leads.create({
          data: leadData,
        });
  
        // Send back the created lead
        res.json(newLead);
      } catch (error) {
        // Safely handle the 'unknown' type
        if (error instanceof Error) {
          // Handle known error type
          console.error("Error creating lead:", error.message);
          res.status(500).json({ error: `Error creating lead: ${error.message}` });
        } else {
          // Handle unknown error type
          console.error("Unknown error:", error);
          res.status(500).json({ error: "An unknown error occurred" });
        }
      }
    } else {
      // If any required fields are missing
      res.status(400).send({ message: "Missing required fields" });
    }
  };


export const handleGetAllLeads = async (
    _req: TypedRequest,
    res: Response
) => {
    try {
        const leads = await prismaClient.tbl_leads.findMany();
        res.json(leads);
    } catch (error) {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Error fetching leads' });
    }
};

export const handleGetLead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const leadData = await prismaClient.tbl_leads.findUnique({
            where: { id: parseInt(id as string) },
        });
        if (leadData) {
            res.json(leadData);
        } else {
            res.status(404).json({ error: 'Lead not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching lead' });
    }
};


export const handleGetLeadsByCompany = async (req: Request, res: Response) => {
    try {
        const { companyId } = req.params;

        // Validate companyId
        const parsedCompanyId = parseInt(companyId);
        if (isNaN(parsedCompanyId) || parsedCompanyId <= 0) {
            return res.status(400).json({ message: 'Invalid company ID' });
        }

        // Fetch leads for the given company
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

        if (leads.length > 0) {
            res.status(200).json({ success: true, data: leads });
        } else {
            res.status(404).json({ success: false, message: 'No leads found for the specified company.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: `Error fetching leads for company: ${(error as Error).message}` });
    }
};

export const handleDeleteLead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Validate if 'id' is a valid number
        const leadId = parseInt(id, 10);
        if (isNaN(leadId)) {
            return res.status(400).json({ error: 'Invalid lead ID' });
        }

        // Attempt to delete the lead by ID
        const deletedLead = await prismaClient.tbl_leads.delete({
            where: { id: leadId },
        });

        // If successful, return a 204 No Content status
        res.status(204).send();
    } catch (error) {
        // Return a 500 error with a more descriptive message
        res.status(500).json({ error: `Error deleting lead: ${(error as Error).message}` });
    }
};

export const handleUpdateLead = async (req: Request, res: Response) => {
    
        const idParam = req.params['id'];
        const id = parseInt(idParam, 10);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid lead ID' });
        }
        const {
            first_name,
            last_name,
            email_id,
            phone_no,
            JobType,
            ServiceType,
            MoveDate,
            MoveTime,
            LoadingCity, // Include all required fields from tbl_leads schema
            company_id,  // Optional field
          } = req.body;
        
          // Check if all required fields are present
          if (
            first_name &&
            last_name &&
            email_id &&
            phone_no &&
            JobType &&
            ServiceType &&
            MoveDate &&
            MoveTime &&
            LoadingCity 
          ) {
            try {
              const leadData:Lead = {
                first_name,
                last_name,
                email: email_id,
                phone: phone_no,
                JobType,
                ServiceType,
                MoveDate,
                MoveTime,
                LoadingCity, // Required field
                company_id: company_id ? parseInt(company_id, 10) : undefined, // Optional field
              };
        

        // Ensure to check if required fields are present in updateData, if necessary
        const newLead = await prismaClient.tbl_leads.update({
            data: leadData,
            where: {
                id: id,
            },
        });
        
        res.json(newLead);
    } catch (error) {
        res.status(500).json({ error: 'Error updating lead' });
    }}else {
        // If any required fields are missing
        res.status(400).send({ message: "Missing required fields" });
      }
    };




const buildWhereClause = (query: any) => {
    const { searchText, email, first_name, last_name, phone } = query;
    const where: any = {};

    if (searchText) {
        where.OR = [
            { email: { contains: searchText } },
            { first_name: { contains: searchText } },
            { last_name: { contains: searchText } },
            { phone: { contains: searchText } },
        ];
    }

    if (email) where.email = { contains: email };
    if (first_name) where.first_name = { contains: first_name };
    if (last_name) where.last_name = { contains: last_name };
    if (phone) where.phone = { contains: phone };

    return where;
};




export const handleGetPagedLead = async (
    req: TypedRequest<unknown, PagedQuery>,
    res: Response
) => {
    try {
        console.log("Query Parameters:", req.query);
        const pageIndex = parseInt(req.query.pageIndex as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        const orderBy = (req.query.orderBy as string) || 'id';
        const orderDirection = (req.query.orderDirection as string) || 'asc';
        const skip = (pageIndex - 1) * pageSize;

        const whereClause = buildWhereClause(req.query);
        console.log("Query Parameters:", req.query);
        console.log("Where Clause:", whereClause);
        
        const [leads, total] = await prismaClient.$transaction([
            prismaClient.tbl_leads.findMany({
                where: whereClause,
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
                where: whereClause
            }),
        ]);

        res.json({
            data: leads,
            total,
            pageIndex,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
        });
    } catch (error) {
        res.status(500).json({ error: `Error fetching paged leads:${error} ` });
    }
};
