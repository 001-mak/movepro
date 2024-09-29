import {Request,Response} from 'express'
import prismaClient from '../config/prisma'
import httpStatus from 'http-status'
import type {
    Lead,CreateLead,TypedRequest
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