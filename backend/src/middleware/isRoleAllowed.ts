import { Request, Response, NextFunction } from "express";

// Middleware factory for role checking
const isRoleAllowed = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role: string = req.user?.user_role as string;

    if (!role) {
      return res.status(401).json({ message: 'No user role found' });
    }

    if (roles.includes(role)) {
      return next();
    }

    return res.status(403).json({ message: 'Forbidden: Unauthorized role' });
  };
};

export default isRoleAllowed;