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








// import { Router, Request, Response, NextFunction } from "express";
// import multer from "multer";
// import prismaClient from "../config/prisma";
// import HttpStatus from "http-status";
// import { IUser } from "../interface/interface";
// import fs from "fs";
// import path from "path";
// import sharp from "sharp";

// // Set up multer for file uploads
// const upload = multer({
//   limits: { fileSize: 10 * 1024 * 1024 }, // Max file size of 10MB
// }).single("profile_picture"); // Field name for profile picture

// const router = Router();

// // Utility function to compress and convert image to base64
// const compressAndConvertImageToBase64 = async (filePath: string): Promise<string> => {
//   try {
//     // Compress image using sharp
//     const compressedImageBuffer = await sharp(filePath)
//       .resize(800, 800, { fit: "inside" }) // Resize to fit within 800x800
//       .toFormat("jpeg") // Convert to JPEG format for better compression
//       .jpeg({ quality: 80 }) // Set JPEG quality to 80 (adjustable for desired compression)
//       .toBuffer();

//     // Convert the compressed image buffer to base64
//     return compressedImageBuffer.toString("base64");
//   } catch (error) {
//     throw new Error("Error compressing or converting image to base64");
//   }
// };

// // Combined API to handle updating profile picture and user details
// router.put("/users/:id", upload, async (req: Request, res: Response, next: NextFunction) => {
//   const { id } = req.params; // Extract user ID from URL
//   const data = req.body as Partial<IUser>; // Extract user data from the request body

//   try {
//     // Find the existing user by ID
//     const existingUser = await prismaClient.tbl_user.findUnique({
//       where: { id: Number(id) },
//     });

//     if (!existingUser) {
//       return res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
//     }

//     let profilePictureBase64: string | undefined;

//     // Handle profile picture upload if available
//     if (req.file) {
//       // Compress and convert the uploaded image to base64
//       const filePath = path.join(__dirname, "uploads", req.file.filename);
//       profilePictureBase64 = await compressAndConvertImageToBase64(filePath);

//       // Optionally, you can delete the file after conversion
//       fs.unlinkSync(filePath);
//     }

//     // Update user data, including profile picture if applicable
//     const updatedUser = await prismaClient.tbl_user.update({
//       where: { id: Number(id) },
//       data: {
//         ...data,
//         picture: profilePictureBase64 || existingUser.picture, // Update the picture field with base64 string
//       },
//       select: {
//         id: true,
//         first_name: true,
//         last_name: true,
//         email_id: true,
//         phone_no: true,
//         user_role: true,
//         picture: true,
//         company_id: true,
//       },
//     });

//     // Return the updated user data as response
//     return res.status(HttpStatus.OK).json({
//       message: "User updated successfully",
//       data: updatedUser,
//     });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//       message: "Internal server error while updating user",
//     });
//   }
// });

// export default router;



// import { Router, Request, Response, NextFunction } from "express";
// import multer from "multer";
// import HttpStatus from "http-status";
// import sharp from "sharp";

// // Set up multer for file uploads
// const upload = multer({
//   limits: { fileSize: 10 * 1024 * 1024 }, // Max file size of 10MB
// }).single("profile_picture");

// const router = Router();

// // Utility function to compress and convert image to base64
// const compressAndConvertToBase64 = async (buffer: Buffer): Promise<string> => {
//   // Use Sharp to compress the image and convert it to base64
//   const compressedBuffer = await sharp(buffer)
//     .resize(800) // Resize to 800px width, maintaining aspect ratio (can be adjusted)
//     .jpeg({ quality: 80 }) // Compress to JPEG format with 80% quality (can be adjusted)
//     .toBuffer();

//   // Convert the compressed image buffer to base64 string
//   return compressedBuffer.toString("base64");
// };

// router.put("/users/:id", upload, async (req: Request, res: Response, next: NextFunction) => {
//   const { id } = req.params; // Extract user ID from URL
//   const data = req.body; // Extract user data from the request body

//   try {
//     if (req.file) {
//       // Compress and convert the uploaded file to base64
//       const profilePictureBase64 = await compressAndConvertToBase64(req.file.buffer);

//       // Update user with the base64-encoded image
//       // You can save this base64 string to a database or send it in the response
//       return res.status(HttpStatus.OK).json({
//         message: "User updated successfully with compressed profile picture",
//         data: { ...data, picture: profilePictureBase64 },
//       });
//     }

//     // If no file was uploaded, return an error
//     return res.status(HttpStatus.BAD_REQUEST).json({ message: "No file uploaded" });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//       message: "Internal server error while updating user",
//     });
//   }
// });

// export default router;

