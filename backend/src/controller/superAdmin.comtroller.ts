import type { Request, NextFunction, Response } from "express";
import prismaClient from "../config/prisma";
import { createAccessToken } from "../utils/generateTokens.util";
import bcrypt from "bcrypt";
import httpStatus from "http-status";

export const handleAdminRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, first_name, last_name, email_id } = req.body;

  // Check for required fields
  if (!first_name || !last_name || !email_id || !password) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "Missing required fields",
    });
  }

  try {
    // Check if user already exists by email
    const existingUser = await prismaClient.tbl_user.findUnique({
      where: { email_id },
    });

    if (existingUser) {
      return res.status(httpStatus.CONFLICT).json({
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await prismaClient.tbl_user.create({
      data: {
        email_id,
        first_name,
        last_name,
        phone_no: '',
        salt,
        password: hashedPassword,
        ssn: '',
        user_role: "super_admin",
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email_id: true,
        user_role: true,
      },
    });

    // Generate access token
    const accessToken = createAccessToken(newUser);

    return res.status(httpStatus.CREATED).json({ accessToken, userData: newUser });
  } catch (error: any) {
    console.log(error)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR)
  }
};
