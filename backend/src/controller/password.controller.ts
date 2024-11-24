import type { NextFunction, Response } from "express";
import prismaClient from "../config/prisma";
import { TypedRequest, IUserRegister, IUserLogin } from "../interface/interface";
import { createAccessToken } from "../utils/generateTokens.util";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/emailService";
import { generateRandomString } from "../utils/common.util";
import httpStatus from "http-status";

// Handle Change Password
export const handleChangePassword = async (
  req: TypedRequest<{ currentPassword: string; newPassword: string }>,
  res: Response,
  next: NextFunction
) => {
  const { currentPassword, newPassword } = req.body;
  const id = req.user.id; // Assuming user is authenticated and their ID is available

  if (!(currentPassword && newPassword)) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Missing required fields." });
  }

  try {
    const user = await prismaClient.tbl_user.findUnique({ where: { id } });

    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "User not found." });
    }

    // Verify current password
    if (!(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid current password." });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update password in the database
    await prismaClient.tbl_user.update({
      where: { id },
      data: { password: hashedNewPassword, salt },
    });

    res.status(httpStatus.OK).json({ message: "Password changed successfully." });
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error', error: JSON.stringify(error) });
  }
};