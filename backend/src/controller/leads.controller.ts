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


