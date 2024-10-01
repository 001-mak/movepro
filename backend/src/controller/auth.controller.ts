import type { NextFunction, Response } from "express";
import prismaClient from "../config/prisma";
import { TypedRequest, IUserRegister, IUserLogin, IUser } from "../interface/interface";
import { createAccessToken } from "../utils/generateTokens.util";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/emailService";
import { generateRandomString } from "../utils/common.util";
export const handleUserRegister = async (
  req: TypedRequest<IUserRegister>,
  res: Response,
  next: NextFunction
) => {
  const {
    password,
    first_name,
    last_name,
    email_id,
    phone_no,
    street,
    city,
    state,
    zip,
    country,
    company_name,
    ssn
  } = req.body;

  if (
    first_name &&
    last_name &&
    email_id &&
    phone_no &&
    company_name &&
    street &&
    city &&
    state &&
    zip &&
    country &&
    password &&
    ssn
  ) {
    try {
      const checkUserEmail = await prismaClient.tbl_user.findUnique({
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
          user_role:"tenant_admin"
        }
      })
      const user_id = user.id
      const companyObj = await prismaClient.tbl_company.create({
        data: {
          user_id,
          company_name,
          company_email:"",
          street: street,
          city: city,
          state: state,
          zip: zip,
          country: country,
          company_logo: '',
          website: '',
          social_fb: '',
          social_tw: '',
          social_in: '',
          social_insta: '',
          social_tube: '',
        }
      });

      const updatedUser = await prismaClient.tbl_user.update({
        where: { id: user.id },
        data: { company_id: companyObj.id }
      });

      const userData = {
        id: user.id,
        first_name,
        last_name,
        email_id,
        user_role: user.user_role,
        phone_no,
        street,
        city,
        state,
        zip,
        country,
        company_name: companyObj.company_name
      };

      const tokenData = {
        id: user.id,
        first_name,
        last_name,
        email_id,
        user_role: user.user_role,
        company_id: companyObj.id
      };

      const accessToken = createAccessToken(tokenData);
      res.status(201).send({ accessToken, userData });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: JSON.stringify(error), ex: error });
    }
  } else {
    next({ message: "missing required fields" });
  }
};


export const handleUserLogin = async (
  req: TypedRequest<IUserLogin>,
  res: Response,
  next: NextFunction
) => {
  const { email_id, password } = req.body;

  if (!email_id || !password) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Check if user exists by email
    const user = await prismaClient.tbl_user.findFirst({
      where: { email_id },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Construct the userData object for response
    const userData = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email_id: user.email_id,
      user_role: user.user_role,
      company_id:user.company_id,
      phone_no: user.phone_no,
      street: user.street,
      city: user.city,
      state: user.state,
      zip: user.zip,
      country: user.country
    };

    // Token payload
    const tokenData = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email_id: user.email_id,
      user_role: user.user_role,
      company_id:user.company_id,
    };

    // Generate JWT access token
    const accessToken = createAccessToken(tokenData);

    // Send response with user data and token
    return res.status(200).json({ accessToken, userData });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: JSON.stringify(error), ex: error });
  }
};

//HANDLE FORGOT PASSWORD

export const handleForgotPassword = async (
  req: TypedRequest<{ email_id: string }>,
  res: Response,
  next: NextFunction
) => {
  const { email_id } = req.body;

  if (!email_id) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // Check if user exists by email
    const user = await prismaClient.tbl_user.findFirst({
      where: { email_id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a reset token and expiration time
    const resetToken = generateRandomString(32);
    const tokenExpiry = new Date(Date.now() + 3600000); // Token valid for 1 hour


    await prismaClient.tbl_user.update({
      where:{
        id: user.id
      },
      data:{
        reset_key: resetToken,
        reset_key_expiry: tokenExpiry
      }
    })

    // Create a password reset link (front-end URL that handles the reset)
    const resetLink = `${process.env.CORS_ORIGIN}/reset-password?token=${resetToken}`;

    // Send password reset email
    await sendEmail(
      user.email_id,
      "Password Reset Request",
      `Please click the following link to reset your password: ${resetLink}`,
    );

    res.status(200).json({ message: "Password reset link sent to your email." });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: JSON.stringify(error), ex: error });
  }
};


export const handleResetPassword = async (
  req: TypedRequest<{ token: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Find user by reset token and check if token is still valid
    const user = await prismaClient.tbl_user.findFirst({
      where: {
        reset_key: token,
        reset_key_expiry: {
          gte: new Date(), // Check if token is still valid
        },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token." });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user password and clear reset token
    await prismaClient.tbl_user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        reset_key: null, // Clear reset token
        reset_key_expiry: null, // Clear token expiry
      },
    });

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: JSON.stringify(error), ex: error });
  }
};