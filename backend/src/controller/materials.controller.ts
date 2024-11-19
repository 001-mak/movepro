import {Request,Response} from 'express'
import prismaClient from '../config/prisma'
import type {
   Material
}from '../interface/interface'
import { PrismaClient } from '@prisma/client';


// Controller function to handle creating a new material
export const handleCreateMaterial = async (req: Request, res: Response) => {
  try {
    // Extract company_id from authenticated user's token
    const company_id = req.user?.company_id;
    console.log(company_id)
    
    // Check if company_id is present
    if (!company_id) {
      return res.status(403).json({ error: 'Unauthorized: company ID not found' });
    }

    // Destructure material data from request body
    const { material_name, material_description, material_price }: Material = req.body;

    // Validate required fields
    if (!material_name || !material_price) {
      return res.status(400).json({
        error: 'Bad Request: material_name and material_price are required',
      });
    }

    // Validate that material_price is a positive number
    if (material_price <= 0) {
      return res.status(400).json({
        error: 'Bad Request: material_price must be a positive number',
      });
    }

    // Create a new material in the database using Prisma
    const newMaterial = await prismaClient.tbl_materials.create({
      data: {
        material_name,
        material_description: material_description || null, // Optional field
        material_price,
        company_id, // Set company_id from the user's token
      },
    });

    // Respond with the newly created material
    return res.status(201).json({
      message: 'Material created successfully',
      material: newMaterial,
    });
  } catch (error) {
    console.error('Error creating material:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Controller function to get all materials for a specific company
export const handleGetAllMaterials = async (req: Request, res: Response) => {
    try {
      // Extract company_id from authenticated user's token
      const company_id = req.user?.company_id;
  
      // Check if company_id is present
      if (!company_id) {
        return res.status(403).json({ error: 'Unauthorized: company ID not found' });
      }
  
      // Fetch all materials that belong to the company
      const materials = await prismaClient.tbl_materials.findMany({
        where: { company_id },
      });
  
      // If no materials found, return a message
      if (materials.length === 0) {
        return res.status(200).json({ message: 'No materials found for this company' });
      }
  
      // Respond with the list of materials
      return res.status(200).json({
        message: 'Materials fetched successfully',
        materials,
      });
    } catch (error) {
      console.error('Error fetching materials:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };


// Controller function to get a material by its ID for a specific company
export const handleGetMaterialById = async (req: Request, res: Response) => {
    try {
      // Extract company_id from authenticated user's token
      const company_id = req.user?.company_id;
  
      // Check if company_id is present
      if (!company_id) {
        return res.status(403).json({ error: 'Unauthorized: company ID not found' });
      }
  
      // Extract material id from request parameters
      const { id } = req.params;
  
      // Validate that the id is a number
      if (isNaN(Number(id))) {
        return res.status(400).json({ error: 'Bad Request: Invalid material ID' });
      }
  
      // Fetch the material by id and check if it belongs to the company
      const material = await prismaClient.tbl_materials.findFirst({
        where: {
          id: Number(id),
          company_id, // Ensure the material belongs to the correct company
        },
      });
  
     
      if (!material) {
        return res.status(200).json({ message: 'Material not found ' });
      }
  
      // Respond with the found material
      return res.status(200).json({
        message: 'Material fetched successfully',
        material,
      });
    } catch (error) {
      console.error('Error fetching material by ID:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

 // Controller function to update a material by its ID for a specific company
export const handleUpdateMaterial = async (req: Request, res: Response) => {
    try {
      // Extract company_id from authenticated user's token
      const company_id = req.user?.company_id;
  
      // Check if company_id is present
      if (!company_id) {
        return res.status(403).json({ error: 'Unauthorized: company ID not found' });
      }
  
      // Extract material id from request parameters
      const { id } = req.params;
  
      // Validate that the id is a number
      if (isNaN(Number(id))) {
        return res.status(400).json({ error: 'Bad Request: Invalid material ID' });
      }
  
      // Extract and type-check material data from request body using Material interface
      const { material_name, material_description, material_price }: Material = req.body;
  
      // Validate required fields using the interface
      if (!material_name || material_price === undefined || material_price <= 0) {
        return res.status(400).json({
          error: 'Bad Request: material_name and valid material_price are required',
        });
      }
  
      // Fetch the material to check if it exists and belongs to the company
      const material = await prismaClient.tbl_materials.findFirst({
        where: {
          id: Number(id),
          company_id, // Ensure the material belongs to the correct company
        },
      });
  
    
      if (!material) {
        return res.status(200).json({ message: 'Material not found ' });
      }
  
      // Update the material in the database
      const updatedMaterial = await prismaClient.tbl_materials.update({
        where: { id: Number(id) },
        data: {
          material_name,
          material_description: material_description || null, // Optional field
          material_price,
        },
      });
  
      // Respond with the updated material
      return res.status(200).json({
        message: 'Material updated successfully',
        material: updatedMaterial,
      });
    } catch (error) {
      console.error('Error updating material:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }; 

// Controller function to delete a material by its ID for a specific company
export const handleDeleteMaterial = async (req: Request, res: Response) => {
    try {
      // Extract company_id from authenticated user's token
      const company_id = req.user?.company_id;
  
      // Check if company_id is present
      if (!company_id) {
        return res.status(403).json({ error: 'Unauthorized: company ID not found' });
      }
  
      // Extract material id from request parameters
      const { id } = req.params;
  
      // Validate that the id is a number
      if (isNaN(Number(id))) {
        return res.status(400).json({ error: 'Bad Request: Invalid material ID' });
      }
  
      // Fetch the material to check if it exists and belongs to the company
      const material = await prismaClient.tbl_materials.findFirst({
        where: {
          id: Number(id),
          company_id, // Ensure the material belongs to the correct company
        },
      });
  
      if (!material) {
        return res.status(200).json({ message: 'Material not found or unauthorized' });
      }
  
      // Delete the material from the database
      await prismaClient.tbl_materials.delete({
        where: { id: Number(id) },
      });
  
      // Respond with success message
      return res.status(200).json({ message: 'Material deleted successfully' });
    } catch (error) {
      console.error('Error deleting material:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Controller function to delete all materials for a specific company
export const handleDeleteAllMaterials = async (req: Request, res: Response) => {
    try {
      // Extract company_id from authenticated user's token
      const company_id = req.user?.company_id;
  
      // Check if company_id is present
      if (!company_id) {
        return res.status(403).json({ error: 'Unauthorized: company ID not found' });
      }
  
      // Fetch all materials belonging to the company
      const materials = await prismaClient.tbl_materials.findMany({
        where: { company_id },
      });
  
      // Check if any materials exist for the company
      if (materials.length === 0) {
        return res.status(200).json({ message: 'No materials found for the company' });
      }
  
      // Delete all materials for the company
      await prismaClient.tbl_materials.deleteMany({
        where: { company_id },
      });
  
      // Respond with a success message
      return res.status(200).json({ message: 'All materials deleted successfully' });
    } catch (error) {
      console.error('Error deleting all materials:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  