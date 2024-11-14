import { Request, Response, NextFunction } from "express";
import sharp from "sharp";
import multer, { Multer } from "multer";
import { MulterRequest } from "../interface/interface";


const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("profile_picture"); 

const compressAndConvertToBase64 = async (buffer: Buffer): Promise<string> => {
  const compressedBuffer = await sharp(buffer)
    .resize(800) 
    .jpeg({ quality: 80 }) 
    .toBuffer();
  return compressedBuffer.toString("base64");
};



 const uploadAndCompressImage = [upload, async (req: MulterRequest, res: Response, next: NextFunction) => {
    if (req.file) {
      try {
        const profilePictureBase64 = await compressAndConvertToBase64(req.file.buffer);
        req.profilePictureBase64 = profilePictureBase64;
        next();
      } catch (error) {
        return res.status(500).json({ message: "Error processing image", error });
      }
    } else {
      next(); 
    }
  }
];
export default uploadAndCompressImage;