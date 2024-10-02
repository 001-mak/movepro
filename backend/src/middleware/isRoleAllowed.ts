import { Request,Response, NextFunction } from "express";

const isRoleAllowed = (req: Request, res: Response, next: NextFunction, roles:string[])=>{

    const role:string = req.user.user_role as string

    if (!role) {
        return res.sendStatus(401).json({ message: 'No user found' });
      }

    if(roles.includes(role)){
        next()
    }
    else{
    return res.sendStatus(403).json({ message: 'Forbidden' });
    }
}

export default isRoleAllowed;