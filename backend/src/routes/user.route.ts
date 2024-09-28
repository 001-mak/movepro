import { Router } from "express";
import * as userController from "../controller/user.controller";
import isAuth from "../middleware/isAuth";
const userRouter = Router();

userRouter.get("/", isAuth, userController.handleGetUsers);

export default userRouter;
