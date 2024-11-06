import type { NextFunction, Request, Response } from "express";
import prismaClient from "../config/prisma";
import HttpStatus from "http-status";
import { ICompany } from "../interface/interface";

export const handleGetCompanies = async (req: Request, res: Response) => {
    try {
        const companies = await prismaClient.tbl_company.findMany()
        if(companies.length===0){
        return res.status(HttpStatus.OK).json({message:"No Company available"})
        }
        return res.status(HttpStatus.OK).json(companies)
        
    } catch (error) {
        console.log(error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const handleGetCompanyById = async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const company = await prismaClient.tbl_company.findUnique({
            where:{
                id: Number(id)
            },
        })
        if(!company){
            return res.status(HttpStatus.OK).json({message:"No Company record available"})
            }
        return res.status(HttpStatus.OK).json(company)
        
    } catch (error) {
        console.log(error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const handleDeleteCompany = async (req: Request, res: Response) => {
    const {id} = req.params
    try {
        const company = await prismaClient.tbl_company.delete({
            where:{
                id: Number(id)
            },
        })
        return res.status(HttpStatus.OK).json({message:"Company Record Deleted"})
        
    } catch (error) {
        console.log(error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

export const handleUpdateCompany = async (req: Request, res: Response) => {
    const data = req.body as Partial<Omit<ICompany, 'user_id' | 'subscription_plan_id'| 'company_email' >>
    const id = req.user.id as number
    try {
        const company = await prismaClient.tbl_company.update({
            where:{
                id:id
            },
            data:data
        })
        return res.status(HttpStatus.OK).json({message:"Company Record Updated", data:company})
        
    } catch (error) {
        console.log(error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
    }
}