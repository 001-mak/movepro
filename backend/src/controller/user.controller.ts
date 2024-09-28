import type { NextFunction, Request, Response } from "express";
import prismaClient from "../config/prisma";
import { AuthRequest } from "../interface/interface";

export const handleGetUsers = async(req:AuthRequest,res:Response,next:NextFunction)=>{
    // console.log(req.user)
    // console.log(req.body)
    return res.send(req.user)
}