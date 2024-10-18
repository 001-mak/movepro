import {Request,Response,NextFunction} from 'express'
import prismaClient from '../config/prisma'
import httpStatus from 'http-status'
import type {
    InventoryGroup,
    InventoryGroupItem,
}from '../interface/interface'

export const handleCreateInventoryGroup = async (req: Request, res: Response) => {
    try {
      const { group_name } = req.body;
  
      // Check if required data is present
      if (!group_name) {
        return res.status(400).json({ message: 'Group name is required.' });
      }
  
      // Ensure user is authenticated and has company_id
      const company_id = req.user?.company_id;
      if (!company_id) {
        return res.status(403).json({ message: 'Unauthorized or company ID not found.' });
      }
  let inventoryGroupData:InventoryGroup={group_name,company_id}
      // Create the inventory group
      const inventoryGroup = await prismaClient.tbl_inventory_groups.create({
        data: inventoryGroupData,
      });
  
      // Send response
      return res.status(201).json(inventoryGroup);
    } catch (error) {
      console.error('Error creating inventory group:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const handleGetAllInventoryGroups = async (req: Request, res: Response) => {
    try {
      // Ensure the user is authenticated and has a company_id
      const company_id = req.user?.company_id;
      if (!company_id) {
        return res.status(403).json({ message: 'Unauthorized or company ID not found.' });
      }
  
      // Fetch all inventory groups for the authenticated company
      const inventoryGroups = await prismaClient.tbl_inventory_groups.findMany({
        where: {
          company_id
        }
      });
  
      // Handle case where no inventory groups are found
      if (inventoryGroups.length === 0) {
        return res.status(404).json({ message: 'No inventory groups found for the company.' });
      }
  
      // Return the found inventory groups
      return res.status(200).json(inventoryGroups);
  
    } catch (error) {
      console.error('Error fetching inventory groups:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const handleGetInventoryGroupById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      // Ensure the user is authenticated and has a company_id
      const company_id = req.user?.company_id;
      if (!company_id) {
        return res.status(403).json({ message: 'Unauthorized or company ID not found.' });
      }
  
      // Validate the provided ID
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: 'Invalid inventory group ID provided.' });
      }
  
      // Fetch the inventory group by ID, ensuring it belongs to the authenticated company
      const inventoryGroup = await prismaClient.tbl_inventory_groups.findFirst({
        where: {
          id: Number(id),
          company_id: company_id,  // Ensure it's linked to the user's company
        },
      });
  
      // Handle case where the inventory group is not found
      if (!inventoryGroup) {
        return res.status(404).json({ message: 'Inventory group not found or unauthorized to access this resource.' });
      }
  
      // Return the found inventory group
      return res.status(200).json(inventoryGroup);
  
    } catch (error) {
      console.error('Error fetching inventory group by ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };


  // Update a specific inventory group by ID for the authenticated user's company
export const handleUpdateInventoryGroup = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { group_name } = req.body;
  
      // Ensure the user is authenticated and has a company_id
      const company_id = req.user?.company_id;
      if (!company_id) {
        return res.status(403).json({ message: 'Unauthorized or company ID not found.' });
      }
  
      // Validate the provided ID
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: 'Invalid inventory group ID provided.' });
      }
  
      // Check if group_name is provided for the update
      if (!group_name) {
        return res.status(400).json({ message: 'Group name is required to update.' });
      }
  
      // Check if the inventory group exists and belongs to the user's company
      const existingGroup= await prismaClient.tbl_inventory_groups.findFirst({
        where: {
          id: Number(id),
          company_id: company_id,  // Ensure it's linked to the user's company
        },
      });
  
      if (!existingGroup) {
        return res.status(404).json({ message: 'Inventory group not found or unauthorized to access this resource.' });
      }
  
      // Update the inventory group with the new group_name
      const updatedGroup = await prismaClient.tbl_inventory_groups.update({
        where: {
          id: Number(id),
        },
        data: {
          group_name: group_name,
        },
      });
  
      // Send the updated group in the response
      return res.status(200).json(updatedGroup);
  
    } catch (error) {
      console.error('Error updating inventory group:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };



  // Delete a specific inventory group by ID for the authenticated user's company
export const handleDeleteInventoryGroup = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      // Ensure the user is authenticated and has a company_id
      const company_id = req.user?.company_id;
      if (!company_id) {
        return res.status(403).json({ message: 'Unauthorized or company ID not found.' });
      }
  
      // Validate the provided ID
      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: 'Invalid inventory group ID provided.' });
      }
  
      // Check if the inventory group exists and belongs to the user's company
      const existingGroup = await prismaClient.tbl_inventory_groups.findFirst({
        where: {
          id: Number(id),
          company_id: company_id,  // Ensure it's linked to the user's company
        },
      });
  
      if (!existingGroup) {
        return res.status(404).json({ message: 'Inventory group not found or unauthorized to access this resource.' });
      }
  
      // Delete the inventory group
      await prismaClient.tbl_inventory_groups.delete({
        where: {
          id: Number(id),
        },
      });
  
      // Send a success message
      return res.status(200).json({ message: 'Inventory group successfully deleted.' });
  
    } catch (error) {
      console.error('Error deleting inventory group:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };


  export const handleGetPagedInventoryGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract and validate pagination query parameters
      const pageIndex = parseInt(req.query.pageIndex as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const orderBy = req.query.orderBy as string || 'id';
      const orderDirection = req.query.orderDirection as string || 'asc';
      
      if (!['asc', 'desc'].includes(orderDirection.toLowerCase())) {
        return res.status(400).json({ message: 'Invalid order direction. Use "asc" or "desc".' });
      }
  
      const skip = (pageIndex - 1) * pageSize;
  
      // Ensure user is authenticated and has company_id
      const company_id = req.user?.company_id;
      if (!company_id) {
        return res.status(403).json({ message: 'Unauthorized or company ID not found.' });
      }
  
      // Fetch inventory groups and total count in a single transaction
      const [inventoryGroups, total] = await prismaClient.$transaction([
        prismaClient.tbl_inventory_groups.findMany({
          where: {
            company_id: company_id, // Restrict to the user's company
          },
          skip,
          take: pageSize,
          orderBy: {
            [orderBy]: orderDirection, // Dynamic ordering
          },
        }),
        prismaClient.tbl_inventory_groups.count({
          where: {
            company_id: company_id, // Restrict to the user's company
          },
        }),
      ]);
  
      // Respond with paginated data
      res.status(200).json({
        data: inventoryGroups,
        total,
        pageIndex,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      });
    } catch (error) {
      console.error('Error fetching paged inventory groups:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };


  export const handleCreateInventoryGroupItem = async (req: Request, res: Response) => {
    try {
        // Check if the user is authenticated
        const user = req.user; // Assuming `req.user` is set by your authentication middleware
        if (!user || !user.id) {
            return res.status(401).json({ message: 'Unauthorized. User is not authenticated.' });
        }

        // Extract data from the request body
        const { item_name, item_size, group_id } = req.body;

        // Validate required fields
        if (!item_name || typeof item_name !== 'string') {
            return res.status(400).json({ message: 'Item name is required and must be a string.' });
        }
        if (!item_size || typeof item_size !== 'string') {
            return res.status(400).json({ message: 'Item size is required and must be a string.' });
        }
        if (typeof group_id !== 'number') {
            return res.status(400).json({ message: 'Group ID is required and must be a number.' });
        }

        // Prepare the data for creation
        const inventoryGroupItemData: InventoryGroupItem = { 
            item_name, 
            item_size, 
            group_id 
        };

        // Create the inventory group item
        const inventoryGroupItem = await prismaClient.tbl_inventory_group_items.create({
            data: inventoryGroupItemData,
        });

        // Send a successful response
        return res.status(201).json(inventoryGroupItem);
    } catch (error: any) {
        console.error('Error creating inventory group item:', error);
        
        // Check for specific error types (like Prisma errors)
        if (error.code === 'P2003') { // Foreign key constraint failed
            return res.status(400).json({ message: 'Invalid group ID. No matching group found.' });
        }

        return res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
};



export const handleGetItemsByGroupId = async (req: Request, res: Response) => {
  try {
      // Check if the user is authenticated
      const user = req.user; // Assuming `req.user` is set by your authentication middleware
      if (!user || !user.id) {
          return res.status(401).json({ message: 'Unauthorized. User is not authenticated.' });
      }

      // Extract group_id from the request parameters
      const groupId = parseInt(req.params.group_id);
      console.log(groupId)
      // Validate group_id
      if (!groupId || isNaN(groupId)) {
          return res.status(400).json({ message: 'Invalid group ID provided.' });
      }

      // Fetch inventory group items by group_id
      const items = await prismaClient.tbl_inventory_group_items.findMany({
          where: {
              group_id: groupId,
          },
      });

      // Check if any items were found
      if (items.length === 0) {
          return res.status(404).json({ message: 'No items found for the specified group ID.' });
      }

      // Send successful response with items
      return res.status(200).json(items);
  } catch (error: any) {
      console.error('Error fetching items by group ID:', error);
      return res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

export const handleDeleteItemById = async (req: Request, res: Response) => {
  try {
      // Check if the user is authenticated
      const user = req.user;// Assuming `req.user` is set by your authentication middleware
      if (!user || !user.id) {
          return res.status(401).json({ message: 'Unauthorized. User is not authenticated.' });
      }

      // Extract item ID from the request parameters
      const itemId = parseInt(req.params.id);
      console.log(itemId);

      // Validate item ID
      if (!itemId || isNaN(itemId)) {
          return res.status(400).json({ message: 'Invalid item ID provided.' });
      }

      // Check if the item exists
      const existingItem = await prismaClient.tbl_inventory_group_items.findUnique({
          where: {
              id: itemId,
          },
      });

      if (!existingItem) {
          return res.status(404).json({ message: 'Item not found.' });
      }

      // Delete the item
      await prismaClient.tbl_inventory_group_items.delete({
          where: {
              id: itemId,
          },
      });

      // Send a successful response
      return res.status(200).json({ message: 'Item deleted successfully.' });
  } catch (error: any) {
      console.error('Error deleting item:', error);
      return res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};


export const handleUpdateItemById = async (req: Request, res: Response) => {
  try {
      // Check if the user is authenticated
      const user = req.user // Assuming `req.user` is set by your authentication middleware
      if (!user || !user.id) {
          return res.status(401).json({ message: 'Unauthorized. User is not authenticated.' });
      }

      // Extract item ID from the request parameters
      const itemId = parseInt(req.params.id);
      console.log(itemId);

      // Validate item ID
      if (!itemId || isNaN(itemId)) {
          return res.status(400).json({ message: 'Invalid item ID provided.' });
      }

      // Extract data from the request body
      const { item_name, item_size} = req.body;

      // Validate input data
      if (!item_name || typeof item_name !== 'string') {
          return res.status(400).json({ message: 'Item name is required and must be a string.' });
      }
      if (!item_size || typeof item_size !== 'string') {
          return res.status(400).json({ message: 'Item size is required and must be a string.' });
      }
   
      // Check if the item exists
      const existingItem = await prismaClient.tbl_inventory_group_items.findUnique({
          where: {
              id: itemId,
          },
      });

      if (!existingItem) {
          return res.status(404).json({ message: 'Item not found.' });
      }
      const inventoryGroupItemData: InventoryGroupItem = { 
        item_name, 
        item_size, 
       
    };

      // Update the item
      const updatedItem = await prismaClient.tbl_inventory_group_items.update({
          where: {
              id: itemId,
          },
          data: inventoryGroupItemData,
      });

      // Send a successful response
      return res.status(200).json(updatedItem);
  } catch (error: any) {
      console.error('Error updating item:', error);
      return res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};


export const handleGetAllItems = async (req: Request, res: Response) => {
  try {
      // Check if the user is authenticated
      const user = req.user // Assuming `req.user` is set by your authentication middleware
      if (!user || !user.id) {
          return res.status(401).json({ message: 'Unauthorized. User is not authenticated.' });
      }

      // Fetch all inventory group items
      const items = await prismaClient.tbl_inventory_group_items.findMany();

      // Check if any items were found
      if (items.length === 0) {
          return res.status(404).json({ message: 'No items found.' });
      }

      // Send successful response with items
      return res.status(200).json(items);
  } catch (error: any) {
      console.error('Error fetching all items:', error);
      return res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

export const handleGetItemById = async (req: Request, res: Response) => {
  try {
      // Check if the user is authenticated
      const user = req.user  // Assuming `req.user` is set by your authentication middleware
      if (!user || !user.id) {
          return res.status(401).json({ message: 'Unauthorized. User is not authenticated.' });
      }

      // Extract item ID from the request parameters
      const itemId = parseInt(req.params.id, 10);
      
      // Validate item ID
      if (isNaN(itemId) || itemId <= 0) {
          return res.status(400).json({ message: 'Invalid item ID provided.' });
      }

      // Fetch the inventory item by ID
      const item = await prismaClient.tbl_inventory_group_items.findUnique({
          where: { id: itemId },
      });

      // Check if the item was found
      if (!item) {
          return res.status(404).json({ message: 'Item not found.' });
      }

      // Send successful response with the item
      return res.status(200).json(item);
  } catch (error: any) {
      console.error('Error fetching item by ID:', error);
      return res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};