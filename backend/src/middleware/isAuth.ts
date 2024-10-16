import { Request,Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  console.log("hehe" , authHeader);
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default isAuth;