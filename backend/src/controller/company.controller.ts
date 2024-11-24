import type { NextFunction, Request, Response } from "express";
import prismaClient from "../config/prisma";
import HttpStatus from "http-status";
import { ICompany } from "../interface/interface";
import { searchFilters } from "../utils/searchFilters";

export const handleGetCompanies = async (req: Request, res: Response) => {
  const user = req.user;

  const pageIndex = parseInt(req.query.pageIndex as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const orderBy = (req.query.orderBy as string) || "id";
  const orderDirection = (req.query.orderDirection as string) || "asc";

  // Calculate skip for pagination
  const skip = (pageIndex - 1) * pageSize;

  let orCondition = undefined;
  if (req.query.searchText) {
    orCondition = searchFilters(["company_email"], req.query);
  }

  try {
    const comapnies = await prismaClient.tbl_company.findMany({
      skip,
      take: pageSize,
      orderBy: {
        [orderBy]: orderDirection,
      },
      where: {
        OR: orCondition,
      },
    });

    // Query to get the total number of users matching criteria without pagination
    const total = await prismaClient.tbl_company.count({
      where: {
        OR: orCondition,
      },
    });

    // Calculate total pages
    const totalPages = Math.ceil(total / pageSize);

    return res
      .status(HttpStatus.OK)
      .json({ data: comapnies, total, pageIndex, pageSize, totalPages });
  } catch (error) {
    console.log(error);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server error" });
  }

  // try {
  //     const companies = await prismaClient.tbl_company.findMany()
  //     if(companies.length===0){
  //     return res.status(HttpStatus.OK).json({message:"No Company available"})
  //     }
  //     return res.status(HttpStatus.OK).json(companies)

  // } catch (error) {
  //     console.log(error);
  //     return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
  // }
};

export const handleGetCompanyById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const company = await prismaClient.tbl_company.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!company) {
      return res
        .status(HttpStatus.OK)
        .json({ message: "No Company record available" });
    }
    return res.status(HttpStatus.OK).json(company);
  } catch (error) {
    console.log(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const handleDeleteCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const company = await prismaClient.tbl_company.delete({
      where: {
        id: Number(id),
      },
    });
    return res
      .status(HttpStatus.OK)
      .json({ message: "Company Record Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const handleUpdateCompany = async (req: Request, res: Response) => {
  const data = req.body as Partial<
    Omit<ICompany, "user_id" | "subscription_plan_id" | "company_email">
  >;
  const id = req.params;
  try {
    const company = await prismaClient.tbl_company.update({
      where: {
        id: Number(id),
      },
      data: data,
    });
    return res
      .status(HttpStatus.OK)
      .json({ message: "Company Record Updated", data: company });
  } catch (error) {
    console.log(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
  }
};
