import type { NextFunction, Response } from "express";
import prismaClient from "../config/prisma";
import { TypedRequest, IUserRegister, IUserLogin } from "../interface/interface";
import { createAccessToken } from "../utils/generateTokens.util";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/emailService";
import { generateRandomString } from "../utils/common.util";
import httpStatus from "http-status";

export const changePassword = async(
    req: Request,
  res: Response,
)=>{
    // const { currentPassword, newPassword } = req.body;
}