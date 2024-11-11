import type { NextFunction, Response } from "express";
import prismaClient from "../config/prisma";
import { TypedRequest, IUserRegister, IUserLogin } from "../interface/interface";
import { createAccessToken } from "../utils/generateTokens.util";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/emailService";
import { generateRandomString } from "../utils/common.util";
import httpStatus from "http-status";

// Handle User Registration
export const handleUserRegister = async (
  req: TypedRequest<IUserRegister>,
  res: Response,
  next: NextFunction
) => {

  const { password, first_name, last_name, email_id, phone_no, street, city, state, zip, country, company_name, ssn } = req.body;

  if (!(first_name && last_name && email_id && phone_no && company_name && street && city && state && zip && country && password && ssn)) {
    return next({ status: httpStatus.BAD_REQUEST, message: "Missing required fields" });
  }

  try {
    const existingUser = await prismaClient.tbl_user.findUnique({ where: { email_id } });

    if (existingUser) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prismaClient.tbl_user.create({
      data: {
        email_id, first_name, last_name, phone_no, salt, password: hashedPassword, ssn, street, city, state, zip, country, user_role: "super_admin",
      },
    });

    const company = await prismaClient.tbl_company.create({
      data: {
        user_id: newUser.id,
        company_name,
        street, city, state, zip, country,
        company_email: "", company_logo: "", website: "",
        social_fb: "", social_tw: "", social_in: "", social_insta: "", social_tube: "",
      },
    });

    await prismaClient.tbl_user.update({
      where: { id: newUser.id },
      data: { company_id: company.id },
    });

    const tokenData = { id: newUser.id, first_name, last_name, email_id, user_role: newUser.user_role, company_id: company.id };
    const accessToken = createAccessToken(tokenData);

    res.status(httpStatus.CREATED).json({ accessToken, userData: tokenData });
  } catch (error: any) {
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message:'Internal server error', error: JSON.stringify(error) });
  
  }
};

// Handle User Login
export const handleUserLogin = async (
  req: TypedRequest<IUserLogin>,
  res: Response,
  next: NextFunction
) => {
  const { email_id, password } = req.body;

  if (!(email_id && password)) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Missing required fields." });
  }

  try {
    const user = await prismaClient.tbl_user.findUnique({ where: { email_id } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid email or password." });
    }

    const tokenData = { id: user.id, first_name: user.first_name, last_name: user.last_name, email_id: user.email_id, user_role: user.user_role, company_id: user.company_id };
    const accessToken = createAccessToken(tokenData);

    res.status(httpStatus.OK).json({ accessToken, userData: tokenData });
  } catch (error: any) {
    console.log(error)
    res.status(500).json(error.message)
  }
};

// Handle Forgot Password
export const handleForgotPassword = async (
  req: TypedRequest<{ email_id: string }>,
  res: Response,
  next: NextFunction
) => {
  const { email_id } = req.body;

  if (!email_id) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Email is required." });
  }

  try {
    const user = await prismaClient.tbl_user.findFirst({ where: { email_id } });

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "User not found." });
    }

    const resetToken = generateRandomString(32);
    const tokenExpiry = new Date(Date.now() + 3600000); // Token valid for 1 hour

    await prismaClient.tbl_user.update({
      where: { id: user.id },
      data: { reset_key: resetToken, reset_key_expiry: tokenExpiry },
    });

    const resetLink = `${process.env.CORS_ORIGIN}/auth/reset-password?token=${resetToken}`;
    await sendEmail(user.email_id, "Password Reset Request", `Please click the link to reset your password: ${resetLink}`);

    res.status(httpStatus.OK).json({ message: "Password reset link sent to your email." });
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message:'Internal server error', error: JSON.stringify(error) });

  }
};

// Handle Reset Password
export const handleResetPassword = async (
  req: TypedRequest<{ token: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  const { token, password } = req.body;

  if (!(token && password)) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Missing required fields." });
  }

  try {
    const user = await prismaClient.tbl_user.findFirst({
      where: {
        reset_key: token,
        reset_key_expiry: { gte: new Date() },
      },
    });

    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid or expired reset token." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prismaClient.tbl_user.update({
      where: { id: user.id },
      data: { password: hashedPassword, reset_key: null, reset_key_expiry: null },
    });

    res.status(httpStatus.OK).json({ message: "Password reset successfully." });
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message:'Internal server error', error: JSON.stringify(error) });

  }
};
