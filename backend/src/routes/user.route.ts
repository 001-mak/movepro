import { Router } from "express";
import * as userController from "../controller/user.controller";
import {handleUpdateUser} from '../controller/profile.controller';
import isAuth from "../middleware/isAuth";
import isRoleAllowed from "../middleware/isRoleAllowed";
import validate from "../middleware/validate";
import {
  updateUserSchema,
  createUserSchema,
  getUsersQuerySchema,
} from "../validation/userValidationSchema";
import { paramsIdSchema,pagedSearchQuerySchema } from "../validation/commonValidation";
import uploadAndCompressImage from '../middleware/uploadAndCompressImage'

const userRouter = Router();

userRouter.get(
    "/",
    validate({
      query: pagedSearchQuerySchema,
    }),
    isAuth,
    isRoleAllowed(["super_admin", "tenant_admin"]),
    userController.handleGetUsers
  );

userRouter.get(
  "/:id",
  validate({
    params: paramsIdSchema,
  }),
  isAuth,
  isRoleAllowed(["super_admin", "tenant_admin"]),
  userController.getUserById
);
userRouter.post(
  "/",
  validate({
    body: createUserSchema,
  }),
  isAuth,
  isRoleAllowed(["super_admin", "tenant_admin"]),
  userController.handleCreateUser
);
userRouter.put(
  "/:id",
  validate({
    body: updateUserSchema,
    params: paramsIdSchema,
  }),
  isAuth,
  isRoleAllowed(["super_admin", "tenant_admin"]),uploadAndCompressImage,
  handleUpdateUser
);

userRouter.delete(
    "/:id",
    validate({
      params: paramsIdSchema
    }),
    isAuth,
    isRoleAllowed(["super_admin", "tenant_admin"]),
    userController.handleDeleteUser
  );

export default userRouter;
