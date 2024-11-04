import express from 'express';
import {Request,Response} from 'express'
import prismaClient from '../config/prisma'

const router = express.Router();

// Create Quotation API Endpoint
export const handleCreateLead = async (req: Request, res: Response) => {
    const {
        lead_id,
        materialsArr,
        inventoryArr,
        trucksArr,
        crewArr,
        start_time,
        end_time,
        hourly_rate,
        travel_charges
    } = req.body;

    try {
        // Step 1: Fetch prices from materials
        const materials = await prismaClient.tbl_materials.findMany({
            where: {
                id: { in: materialsArr }
            },
            select: {
                material_price: true
            }
        });
        // const trucks = await prismaClient.tbl_truck.findMany({
        //     where: {
        //         id: { in: trucksArr }
        //     },
        //     select: {
        //         material_price: true
        //     }
        // });
        // Step 2: Fetch prices from inventory
        // const inventoryItems = await prismaClient.tbl_inventory_group_items.findMany({
        //     where: {
        //         id: { in: inventoryArr }
        //     },
        //     select: {
        //         price: true // Adjust according to your inventory table structure
        //     }
        // });

        // Step 3: Calculate total costs
        const materialCost = materials.reduce((sum, item) => sum + item.material_price, 0);
        // const inventoryCost = inventoryItems.reduce((sum, item) => sum + item.price, 0);
        const inventoryCost="asdf"
        
        // Additional costs (you may need to adjust this logic)
        const laborCost = hourly_rate * 4; // Example: assuming 4 hours of work
        const totalCost = materialCost + inventoryCost + laborCost + travel_charges;

        // Step 4: Create quotation in the database
        const quotation = await prismaClient.tbl_quotation.create({
            data: {
                lead_id,
                datas: {
                    materialCost,
                    inventoryCost,
                    laborCost,
                    travelCharges: travel_charges,
                    totalCost,
                },
                inventoryArr: JSON.stringify(inventoryArr), // Storing as JSON
                materialsArr: JSON.stringify(materialsArr), // Storing as JSON
                trucksArr: JSON.stringify(trucksArr), // Storing as JSON
                crewArr: JSON.stringify(crewArr), // Storing as JSON
                start_time,
                end_time,
                hourly_rate,
                travel_charges,
                status: 'pending' // Initial status set to 'pending'
            }
        });

        // Step 5: Return response
        res.json({
            success: true,
            data: quotation
        });
    } catch (error) {
        console.error('Error creating quotation:', error);
        res.status(500).json({ success: false, message: 'Error creating quotation' });
    }
}

// Update Quotation Status API Endpoint
export const updateQuotationStatus = async (req: Request, res: Response) => {
    const { status } = req.body; // e.g., 'accepted' or 'rejected'
    const { id } = req.params;

    try {
        const updatedQuotation = await prismaClient.tbl_quotation.update({
            where: { id: parseInt(id) },
            data: { status }
        });

        res.json({
            success: true,
            data: updatedQuotation
        });
    } catch (error) {
        console.error('Error updating quotation status:', error);
        res.status(500).json({ success: false, message: 'Error updating quotation status' });
    }
}

export default router;