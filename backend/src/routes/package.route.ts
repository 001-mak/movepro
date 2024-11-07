import { Router } from "express";
import {
  handleGetSubscriptionPlanById,
  handleCreateSubscriptionPlan,
  handleDeleteSubscriptionPlan,
  handleGetSubscriptionPlans,
  handleUpdateSubscriptionPlan,
} from "../controller/packages.controller";
import validate from "../middleware/validate";
import isAuth from "../middleware/isAuth";
import isRoleAllowed from "../middleware/isRoleAllowed";
import { paramsIdSchema } from "../validation/commonValidation";

const packageRouter = Router();

packageRouter.get(
  "/",
  isAuth,
  isRoleAllowed(["super_admin"]),
  handleGetSubscriptionPlans
);

packageRouter.get(
  "/:id",
  validate({
    params: paramsIdSchema,
  }),
  isAuth,
  isRoleAllowed(["super_admin"]),
  handleGetSubscriptionPlanById
);

packageRouter.post(
    "/",
    isAuth,
    isRoleAllowed(["super_admin"]),
    handleCreateSubscriptionPlan
);

packageRouter.put(
    "/:id",
    isAuth,
    isRoleAllowed(["super_admin"]),
    handleUpdateSubscriptionPlan
);

packageRouter.delete(
    "/:id",
    validate({
      params: paramsIdSchema,
    }),
    isAuth,
    isRoleAllowed(["super_admin"]),
    handleDeleteSubscriptionPlan
);

export default packageRouter;
