import { Router } from "express";
import * as truckController from "../controller/truck.controller";
import isAuth from "../middleware/isAuth";
import {
  createTruckSchema,
  updateTruckSchema,
} from "../validation/truckValidationSchema";
import validate from "../middleware/validate";
import isRoleAllowed from "../middleware/isRoleAllowed";
import { pagedSearchQuerySchema, paramsIdSchema } from "../validation/commonValidation";

const truckRouter = Router();
truckRouter.post(
  "/",
  isAuth,
  isRoleAllowed(["tenant_admin"]),
  validate({
    body: createTruckSchema,
  }),
  truckController.handleCreateTruck
);

truckRouter.get(
  "/",
  isAuth,
  isRoleAllowed(["super_admin", "tenant_admin"]),
  validate({
    query: pagedSearchQuerySchema,
  }),
  truckController.handleGetTrucks
);

truckRouter.get(
  "/:id",
  isAuth,
  isRoleAllowed(["super_admin", "tenant_admin"]),
  validate({
    params: paramsIdSchema,
  }),
  truckController.handleGetTruckById
);

truckRouter.put(
  "/:id",
  isAuth,
  isRoleAllowed(["tenant_admin"]),
  validate({
      params: paramsIdSchema,
      body: updateTruckSchema,
  }),
  truckController.handleUpdateTruck
);

truckRouter.delete(
    "/:id",
    isAuth,
    isRoleAllowed(["tenant_admin"]),
    validate({
      params: paramsIdSchema,
    }),
    truckController.handleDeleteTruck
  );

export default truckRouter;
