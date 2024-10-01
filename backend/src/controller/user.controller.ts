import type { NextFunction, Request, Response } from "express";
import prismaClient from "../config/prisma";
import bcrypt from "bcrypt";
import { ITokenData, IUser } from "../interface/interface";
const selectUserData = {
  first_name:true,
  last_name:true,
  email_id:true,
  phone_no:true,
  company_id:true,
}

export const handleGetUsers = async(req:Request,res:Response,next:NextFunction)=>{
    const user = req.user as ITokenData;
    console.log(req.user)
    if(user.user_role === "super_admin"){
        try {
            const users = prismaClient.tbl_user.findMany()
            res.sendStatus(200).json(users)
        } catch (error) {
            res.sendStatus(500).json({message:"Interval server error"})
        }
    }
    else if(user.user_role === "tenant_admin"){
      try {
        const users = prismaClient.tbl_user.findMany({
          where:{
            company_id:user.company_id
          }
        })
        res.sendStatus(200).json(users)
    } catch (error) {
        res.sendStatus(500).json({message:"Interval server error"})
    }
    }
    else{
        res.sendStatus(403)
    }
}

export const handleCreateUser = async (req:Request, res:Response)=>{
    const user = req.user;
    const {
        password,
        first_name,
        last_name,
        email_id,
        phone_no,
        ssn,
        street,
        city,
        state,
        zip,
        country,
        current_pay,
      } = req.body as IUser;

      if (
        first_name &&
        last_name &&
        email_id &&
        ssn &&
        phone_no &&
        street &&
        city &&
        state &&
        zip &&
        country &&
        password
      ){
        try {
          const checkUserEmail = await prismaClient.tbl_user.findFirst({
            where: {
              email_id,
            },
          });
    
          if (checkUserEmail) {
            return res.status(400).json({ message: "User already exists." }); // email is already in db
          }
    
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
    
          const user = await prismaClient.tbl_user.create({
            data:{
              email_id,
              first_name,
              last_name,
              phone_no,
              salt,
              password:hashedPassword,
              ssn:ssn,
              street,
              city,
              state,
              zip,
              country,
            }
          })
          const user_id = user.id

          res.sendStatus(201).json({ message:"New User created" });
        } catch (error: any) {
          console.log(error);
          res.status(500).json({ error: JSON.stringify(error), ex: error });
        }
      } else {
        res.sendStatus(400).json({ message: "missing required fields" });
      }
}