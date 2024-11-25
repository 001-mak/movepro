import type { Request, Response, NextFunction } from "express";
import prismaClient from "../config/prisma";
import httpStatus from "http-status";
import { ITruck } from "../interface/interface";
import { searchFilters } from "../utils/searchFilters";

// Create a Truck
export const handleCreateTruck = async (req: Request, res: Response) => {
  const data = req.body as ITruck;
  try {
    const newTruck = await prismaClient.tbl_truck.create({
      data: {
        ...data,
        last_maintenance_date: data.last_maintenance_date
          ? new Date(data.last_maintenance_date)
          : null,
        next_maintenance_date: data.next_maintenance_date
          ? new Date(data.next_maintenance_date)
          : null,
        company_id: req.user.company_id,
      },
    });
    return res.status(httpStatus.CREATED).json(newTruck);
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error while creating truck",
    });
  }
};

export const handleGetTrucks = async (req: Request, res: Response) => {
  // Default values for pagination and sorting
  const pageIndex = parseInt(req.query.pageIndex as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const orderBy = (req.query.orderBy as string) || "id";
  const orderDirection = (req.query.orderDirection as string) || "asc";
  const skip = (pageIndex - 1) * pageSize;

  let orCondition = undefined;
  if (req.query.searchText) {
    orCondition = searchFilters(["volume"], req.query);
  }

  try {
    const trucks = await prismaClient.tbl_truck.findMany({
      skip,
      take: pageSize,
      orderBy: {
        [orderBy]: orderDirection,
      },
      where: {
        company_id: req.user.company_id ? req.user.company_id : undefined,
        OR: orCondition,
      },
    });
    const total = await prismaClient.tbl_truck.count({
      where: {
        company_id: req.user.company_id ? req.user.company_id : undefined,
        OR: orCondition,
      },
    });

    const totalPages = Math.ceil(total / pageSize);

    return res
      .status(httpStatus.OK)
      .json({ data: trucks, total, pageIndex, pageSize, totalPages });
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

// Get Truck by ID
export const handleGetTruckById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const truck = await prismaClient.tbl_truck.findUnique({
      include: {
        tbl_user: true,
      },
      where: {
        id: Number(id),
      },
    });
    if (!truck) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Truck not found",
      });
    }

    return res.status(httpStatus.OK).json(truck);
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error while fetching truck Data",
    });
  }
};

// Update Truck by ID
export const handleUpdateTruck = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body as Partial<ITruck>;

  try {
    const existingTruck = await prismaClient.tbl_truck.findUnique({
      where: { id: Number(id) },
    });

    if (!existingTruck) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Truck not found",
      });
    }

    const updatedTruck = await prismaClient.tbl_truck.update({
      where: { id: Number(id) },
      data,
    });

    return res.status(httpStatus.OK).json({
      message: "Truck updated successfully",
      updatedTruck,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error while updating truck",
    });
  }
};

// Delete Truck by ID
export const handleDeleteTruck = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prismaClient.tbl_truck.delete({
      where: { id: Number(id) },
    });
    return res.status(httpStatus.OK).json({
      message: "Truck deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error while deleting truck",
    });
  }
};