import type { NextFunction, Request, Response } from "express";
import prismaClient from '../config/prisma'
import type {
   Material
} from '../interface/interface'
import { PrismaClient } from '@prisma/client';
import HttpStatus from "http-status";
import { searchFilters } from "../utils/searchFilters";

export const handleCreateMaterial = async (req: Request, res: Response) => {
  try {
    const company_id = req.user?.company_id;
    console.log(company_id);
    
    if (!company_id) {
      return res.status(403).json({ error: 'Unauthorized: company id not found user is unauthorized' });
    }
    const { material_name, material_description, material_price }: Material = req.body;

    if (!material_name || !material_price) {
      return res.status(400).json({
        error: 'Bad Request: material_name and material_price are required',
      });
    }
   
    if (material_price <= 0) {
      return res.status(400).json({
        error: 'Bad Request: material_price must be a positive number',
      });
    }
  
    const newMaterial = await prismaClient.tbl_materials.create({
      data: {
        material_name,
        material_description: material_description || null,
        material_price,
        company_id, 
      },
    });

    return res.status(201).json({
      message: 'Material created successfully',
      material: newMaterial,
    });
  } catch (error) {
    console.error('Error creating material:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const handleGetAllMaterials = async (req: Request, res: Response) => {
  try {
    const company_id = req.user?.company_id;
    
    if (!company_id) {
      return res.status(403).json({ error: 'Unauthorized: company ID not found' });
    }

    const pageIndex = parseInt(req.query.pageIndex as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const orderBy = (req.query.orderBy as string) || "id";
    const orderDirection = (req.query.orderDirection as string) || "asc";

    const skip = (pageIndex - 1) * pageSize;

    const [materials, total] = await Promise.all([
      prismaClient.tbl_materials.findMany({
        where: { company_id },
        skip,
        take: pageSize,
        orderBy: {
          [orderBy]: orderDirection,
        },
      }),
      prismaClient.tbl_materials.count({
        where: { company_id }
      })
    ]);

    const totalPages = Math.ceil(total / pageSize);

    if (total === 0) {
      return res.status(200).json({ 
        message: 'No materials found for this company',
        data: [],
        total: 0,
        pageIndex,
        pageSize,
        totalPages: 0 
      });
    }

    return res.status(200).json({
      message: 'Materials fetched successfully',
      data: materials,
      total,
      pageIndex,
      pageSize,
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching materials:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      details: error instanceof Error ? error.message : undefined 
    });
  }
};

export const handleGetPagedAllMaterials = async (req: Request, res: Response) => {
  try {
    const materiaData = {
      id: true,
      material_name: true,
      material_description: true,
      material_price: true
    };
    const company_id = req.user?.company_id;

    if (!company_id) {
      return res.status(403).json({ error: 'Unauthorized: company id not found user is unauthorized' });
    }
    const pageIndex = parseInt(req.query.pageIndex as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const orderBy = (req.query.orderBy as string) || "id";
    const orderDirection = (req.query.orderDirection as string) || "asc";

    const skip = (pageIndex - 1) * pageSize;
    const accessFilter = {
      company_id: req.user.company_id, 
    };
    let orCondition = undefined;
    if (req.query.searchText) {
      orCondition = searchFilters(["material_name", "material_description","material_price"], req.query);
    }
    const materials = await prismaClient.tbl_materials.findMany({
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
        ...materiaData,
      },
    });
     
    const total = await prismaClient.tbl_user.count({
      where: {
        AND: [accessFilter],
        OR: orCondition,
      },
    });
  
    const totalPages = Math.ceil(total / pageSize);
  
    return res
      .status(200)
      .json({ data: materials , total, pageIndex, pageSize, totalPages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const handleGetMaterialById = async (req: Request, res: Response) => {
  try {
    const company_id = req.user?.company_id;
  
    if (!company_id) {
      return res.status(403).json({ error: 'Unauthorized: company id not found user is unauthorized' });
    }
  
    const { id } = req.params;
  
    if (isNaN(Number(id))) {
      return res.status(400).json({ error: 'Bad Request: Invalid material ID' });
    }
  
    const material = await prismaClient.tbl_materials.findFirst({
      where: {
        id: Number(id),
        company_id, 
      },
    });
  
    if (!material) {
      return res.status(200).json({ message: 'Material not found ' });
    }
  
    return res.status(200).json({
      message: 'Material fetched successfully',
      material,
    });
  } catch (error) {
    console.error('Error fetching material by ID:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const handleUpdateMaterial = async (req: Request, res: Response) => {
  try {
    const company_id = req.user?.company_id;
  
    if (!company_id) {
      return res.status(403).json({ error: 'Unauthorized: company id not found user is unauthorized' });
    }
  
    const { id } = req.params;
  
    if (isNaN(Number(id))) {
      return res.status(400).json({ error: 'Bad Request: Invalid material ID' });
    }
  
    const { material_name, material_description, material_price }: Material = req.body;
  
    if (!material_name || material_price === undefined || material_price <= 0) {
      return res.status(400).json({
        error: 'Bad Request: material_name and valid material_price are required',
      });
    }
  
    const material = await prismaClient.tbl_materials.findFirst({
      where: {
        id: Number(id),
        company_id, 
      },
    });
  
    if (!material) {
      return res.status(200).json({ message: 'Material not found ' });
    }
  
    const updatedMaterial = await prismaClient.tbl_materials.update({
      where: { id: Number(id) },
      data: {
        material_name,
        material_description: material_description || null,
        material_price,
      },
    });
  
    return res.status(200).json({
      message: 'Material updated successfully',
      material: updatedMaterial,
    });
  } catch (error) {
    console.error('Error updating material:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}; 

export const handleDeleteMaterial = async (req: Request, res: Response) => {
  try {
    const company_id = req.user?.company_id;
  
    if (!company_id) {
      return res.status(403).json({ error: 'Unauthorized: company id not found user is unauthorized' });
    }
  
    const { id } = req.params;
  
    if (isNaN(Number(id))) {
      return res.status(400).json({ error: 'Bad Request: Invalid material ID' });
    }
  
    const material = await prismaClient.tbl_materials.findFirst({
      where: {
        id: Number(id),
        company_id, 
      },
    });
  
    if (!material) {
      return res.status(200).json({ message: 'Material not found' });
    }
  
    await prismaClient.tbl_materials.delete({
      where: { id: Number(id) },
    });
  
    return res.status(200).json({ message: 'Material deleted successfully' });
  } catch (error) {
    console.error('Error deleting material:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}; 

export const handleDeleteAllMaterials = async (req: Request, res: Response) => {
  try {
    const company_id = req.user?.company_id;
  
    if (!company_id) {
      return res.status(403).json({ error: 'Unauthorized: company id not found user is unauthorized' });
    }
  
    const materials = await prismaClient.tbl_materials.findMany({
      where: { company_id },
    });
  
    if (materials.length === 0) {
      return res.status(200).json({ message: 'No materials found for the company' });
    }
  
    await prismaClient.tbl_materials.deleteMany({
      where: { company_id },
    });
  
    return res.status(200).json({ message: 'All materials deleted successfully' });
  } catch (error) {
    console.error('Error deleting all materials:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};