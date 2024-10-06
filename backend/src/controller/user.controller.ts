import type { NextFunction, Request, Response } from "express";
import prismaClient from "../config/prisma";
import bcrypt from "bcrypt";
import { ITokenData, IUser } from "../interface/interface";
import HttpStatus from "http-status";

const selectUserData = {
  first_name: true,
  last_name: true,
  email_id: true,
  phone_no: true,
  user_role: true,
  picture: true,
};

const fetchUsers = async (user: ITokenData, page: number, limit: number, query:any) => {
  const skip = (page - 1) * limit;

  const queryFilter =
    user.user_role === "super_admin"
      ? { id: { not: user.id } }
      : { company_id: user.company_id, id: { not: user.id } };

  const [users, totalCount] = await Promise.all([
    prismaClient.tbl_user.findMany({
      skip,
      take: limit,
      where: {
        AND:[queryFilter],
        OR:[
          {
            email_id: query?.email_id ? String(query.email_id) : query?.searchText ? String(query.searchText) : undefined,
            first_name: query?.first_name ? String(query.first_name) : query?.first_name ? String(query.first_name) : undefined,
            last_name: query?.last_name ? String(query.last_name) : query?.last_name ? String(query.last_name) : undefined,
          }
        ]
      },
      select: selectUserData,
    }),
    prismaClient.tbl_user.count({ where: queryFilter }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return { users, totalCount, totalPages, currentPage: page, pageSize: limit };
};

export const handleGetUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as ITokenData;
    const query = req.query
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.pageSize as string) || 10;

    if (user.user_role === "super_admin" || user.user_role === "tenant_admin") {
      const result = await fetchUsers(user, page, limit,query);
      return res.status(HttpStatus.OK).json(result);
    }

    return res.status(HttpStatus.FORBIDDEN); // 403 Forbidden
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};

export const handleCreateUser = async (req: Request, res: Response) => {
  const loggedInUser = req.user as ITokenData;
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
  }: IUser = req.body;

  if (
    !first_name ||
    !last_name ||
    !email_id ||
    !ssn ||
    !password ||
    !phone_no ||
    !street ||
    !city ||
    !state ||
    !zip ||
    !country
  ) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      message: "Missing required fields",
    });
  }

  try {
    const checkUserEmail = await prismaClient.tbl_user.findUnique({
      where: { email_id },
    });

    if (checkUserEmail) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "User already exists.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (["driver", "crew"].includes(req.body.user_role)) {
      const newUser = await prismaClient.tbl_user.create({
        data: {
          email_id,
          first_name,
          last_name,
          phone_no,
          salt,
          password: hashedPassword,
          ssn,
          street,
          city,
          state,
          zip,
          country,
        },
        select: selectUserData,
      });

      return res.status(HttpStatus.CREATED).json(newUser);
    }

    return res.status(HttpStatus.NOT_FOUND).json({
      message: "Role not found",
    });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};


export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params; // Assuming the ID is passed as a URL parameter

  try {
    // Find user by ID
    const user = await prismaClient.tbl_user.findUnique({
      where: { id: Number(id) }, // Convert the id to a number for comparison
    });

    if (!user) {
      // If the user does not exist, return a 404 Not Found error
      return res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
    }

    // If the user is found, return the user data
    return res.status(HttpStatus.OK).json({message:"User Deleted"});
  } catch (error) {
    console.error("Error fetching user by ID:", error);

    // If an error occurs, return a 500 Internal Server Error
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error while fetching user",
    });
  }
};

export const handleUpdateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params; // Extract user_id from the request parameters
  const data = req.body as Partial<Omit<IUser,'email_id' | 'ssn'>>; // Extract fields to be updated from the request body

  try {
    // Check if the user exists
    const existingUser = await prismaClient.tbl_user.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
    }

    // Update the user data in the database
    const updatedUser = await prismaClient.tbl_user.update({
      where: { id: Number(id) },
      data: data,
      select: selectUserData, // Return the selected fields after the update
    });

    // Send the updated user data in the response
    return res.status(HttpStatus.OK).json({
      message: "User updated successfully"
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error while updating user",
    });
  }
};

export const handleDeleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    // Delete the user
    await prismaClient.tbl_user.delete({
      where: { id: Number(id) },
    });

    return res.status(HttpStatus.OK).json({
      message: "User successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error"
    });
  }
};
