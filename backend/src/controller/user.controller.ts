import type { NextFunction, Request, Response } from "express";
import prismaClient from "../config/prisma";
import bcrypt from "bcrypt";
import { ITokenData, IUser } from "../interface/interface";
import HttpStatus from "http-status";
import { searchFilters } from "../utils/searchFilters";

const selectUserData = {
  id: true,
  first_name: true,
  last_name: true,
  email_id: true,
  phone_no: true,
  user_role: true,
  picture: true,
  company_id: true,
};

export const handleGetUsers = async (req: Request, res: Response) => {
  try {
    const user = req.user as ITokenData;
    // Default values for pagination and sorting
    const pageIndex = parseInt(req.query.pageIndex as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const orderBy = (req.query.orderBy as string) || "id";
    const orderDirection = (req.query.orderDirection as string) || "asc";

    // Calculate skip for pagination
    const skip = (pageIndex - 1) * pageSize;

    const accessFilter =
      user.user_role === "super_admin"
        ? { id: { not: user.id } }
        : { company_id: user.company_id, id: { not: user.id } };

    let orCondition = undefined;
    if (req.query.searchText){
      orCondition = searchFilters(
        ["first_name", "last_name", "email_id"],
        req.query
      );
    } 

    // Query to get paginated users
    const users = await prismaClient.tbl_user.findMany({
      skip,
      take: pageSize,
      orderBy: {
        [orderBy]: orderDirection,
      },
      where: {
        AND: [accessFilter],
        OR: orCondition,
      },
      select: {
        ...selectUserData,
      },
    });

    // Query to get the total number of users matching criteria without pagination
    const total = await prismaClient.tbl_user.count({
      where: {
        AND: [accessFilter],
        OR: orCondition,
      },
    });

    // Calculate total pages
    const totalPages = Math.ceil(total / pageSize);

    return res
      .status(HttpStatus.OK)
      .json({ data: users, total, pageIndex, pageSize, totalPages });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      error,
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
    user_role,
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
    !country ||
    !user_role
  ) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      message: "Missing required fields",
    });
  }

  if (user_role === "driver") {
    const { license_number, license_expiry } = req.body;
    if (!license_number || !license_expiry) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Missing required fields",
      });
    }
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
        user_role,
      },
      select: selectUserData,
    });

    if (user_role === "driver") {
      await prismaClient.tbl_driver.create({
        data: {
          user_id: newUser.id,
          license_number: req.body.license_number as string,
          license_expiry: req.body.license_expiry as string,
        },
      });
    }

    return res.status(HttpStatus.CREATED).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params; // Assuming the ID is passed as a URL parameter

  try {
    // Find user by ID
    const user = await prismaClient.tbl_user.findUnique({
      where: { id: Number(id) }, // Convert the id to a number for comparison
      select: {
        ...selectUserData,
        tbl_driver: {
          select: {
            license_number: true,
            license_expiry: true,
          },
        },
      },
    });

    if (!user) {
      // If the user does not exist, return a 404 Not Found error
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // If the user is found, return the user data
    return res.status(HttpStatus.OK).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);

    // If an error occurs, return a 500 Internal Server Error
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error while fetching user",
    });
  }
};

export const handleUpdateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params; // Extract user_id from the request parameters
  const data = req.body as Partial<Omit<IUser, "email_id" | "ssn">>; // Extract fields to be updated from the request body

  try {
    // Check if the user exists
    const existingUser = await prismaClient.tbl_user.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // Update the user data in the database
    const updatedUser = await prismaClient.tbl_user.update({
      where: { id: Number(id) },
      data: data,
      select: selectUserData, // Return the selected fields after the update
    });

    // Send the updated user data in the response
    return res.status(HttpStatus.OK).json({
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error while updating user",
    });
  }
};

export const handleDeleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      message: "Internal server error",
    });
  }
};
