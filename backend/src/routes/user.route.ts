import { Router } from "express";
import * as userController from "../controller/user.controller";
import isAuth from "../middleware/isAuth";
import isRoleAllowed from "../middleware/isRoleAllowed";
import validate from "../middleware/validate";
import {
  updateUserSchema,
  createUserSchema,
} from "../validation/userValidationSchema";
import { paramsIdSchema } from "../validation/commonValidation";
const userRouter = Router();

userRouter.get(
  "/",
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
  isRoleAllowed(["super_admin", "tenant_admin"]),
  userController.handleUpdateUser
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
