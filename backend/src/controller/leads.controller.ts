import {Request,Response} from 'express'
import prismaClient from '../config/prisma'
import httpStatus from 'http-status'
import type {
    Lead,CreateLead,TypedRequest,PagedQuery
}from '../interface/interface'


export const handleCreateLead = async (
    req: TypedRequest<CreateLead>,
    res: Response
) => {
    try {
       let c: any = { ...req.body };
        // c.created_at = new Date();
        const newLead = await prismaClient.tbl_leads.create({
            data: c,
        });
        res.json(newLead);
    } catch (error) {
        res.status(500).json({ error: `Error creating lead: ${error}` });
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


export const handleDeleteLead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prismaClient.tbl_leads.delete({
            where: { id: parseInt(id as string) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting lead' });
    }
};

export const handleUpdateLead = async (
    req: TypedRequest<Lead>,
    res: Response
) => {
    try {
        const id: string = req.params['id'] as string;

        let c: any = { ...req.body };
       

        const newLead = await prismaClient.tbl_leads.update({
            data: c,
            where: {
                id: parseInt(id)
            }
        });
        res.json(newLead);
    } catch (error) {
        res.status(500).json({ error: 'Error creating lead' });
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
                    provider_id: true,
                    assigned_to: true,
                    lead_id: true,
                    first_name: true,
                    last_name: true,
                    phone: true,
                    email: true,
                    JobDetail: true,
                    JobType: true,
                    ServiceType: true,
                    DesiredDate: true,
                    DesiredTime: true,
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
                    assigned_date: true
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
