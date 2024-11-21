import { Response} from "express";
import HttpStatus from "http-status";
import {MulterRequest} from "../interface/interface";
import prismaClient from "../config/prisma";


export const handleUpdateUser = async (req: MulterRequest, res: Response) => {
    const { id } = req.params;
    // const data = req.body;
    const { first_name, last_name,city, state,zip,phone_no,country} = req.body;

    try {
      const existingUser = await prismaClient.tbl_user.findUnique({
        where: { id: Number(id) },
      });
  
      if (!existingUser) {
        return res.status(HttpStatus.OK).json({ message: "User not found or EXISTS" });
      }
  
      
      if (existingUser.id !== req.user.id) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: "You are not allowed to update this user" });
      }
      const updateData: any = {
        first_name:first_name,
        last_name:last_name,
        city:city,
        state:state,
        zip:zip,
        phone_no:phone_no,
        country:country
        
    };
      if (req.profilePictureBase64) {
        const profilePictureBase64 = req.profilePictureBase64;
        updateData.picture=profilePictureBase64
    }  
  

      const updatedUser = await prismaClient.tbl_user.update({
        where: { id: Number(id) },
        data:updateData,
      });
  
      return res.status(HttpStatus.OK).json({
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error,
      });
    }
  };





