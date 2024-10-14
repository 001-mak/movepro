import type { Request, Response,NextFunction } from "express";
import prismaClient from "../config/prisma";
import httpStatus from "http-status";
import { ITruck } from "../interface/interface";

// Create a Truck
export const handleCreateTruck = async (req: Request, res: Response) => {
    const {
      rented,
      make,
      model,
      year_of_manufacture,
      vin,
      license_plate_number,
      license_plate_state_province,
      truck_type,
      truck_capacity,
      owner_name,
      lease_details,
      insurance_provider,
      insurance_policy_number,
      fuel_efficiency,
      tare_weight,
      payload_capacity,
      volume,
      last_maintenance_date,
      next_maintenance_date,
      dot_compliance_number,
      cvor_number,
      cargo_restrictions,
      vehicle_notes,
      special_permits,
    } = req.body as Omit<ITruck,'company_id'>;
  
    try {
      const newTruck = await prismaClient.tbl_truck.create({
        data: {
          company_id:1,
          rented,
          make,
          model,
          year_of_manufacture,
          vin,
          license_plate_number,
          license_plate_state_province,
          truck_type,
          truck_capacity,
          owner_name,
          lease_details,
          insurance_provider,
          insurance_policy_number,
          fuel_efficiency,
          tare_weight,
          payload_capacity,
          volume,
          last_maintenance_date,
          next_maintenance_date,
          dot_compliance_number,
          cvor_number,
          cargo_restrictions,
          vehicle_notes,
          special_permits,
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

export const handleGetTrucks = async(req: Request, res: Response)=>{
    try {
        const trucks = prismaClient.tbl_truck.findMany({
            select:{
              id: true,
              rented: true,
              make: true,
              model: true,
              truck_type: true,
              truck_capacity: true,
              payload_capacity:true,
              volume:true,
            },
            where:{
              company_id: req.user.company_id? req.user.company_id : undefined
            }
        })
        return res.status(httpStatus.OK).json(trucks)
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: "Server Error"})
    }
}

// Get Truck by ID
export const handleGetTruckById = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const truck = await prismaClient.tbl_truck.findUnique({
      where: { id: Number(id) },
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
      message: "Internal server error while fetching truck",
    });
  }
};

// Update Truck by ID
export const handleUpdateTruck = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

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

