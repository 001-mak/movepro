import { Router } from "express";
import isAuth from "../middleware/isAuth";
import isRoleAllowed from "../middleware/isRoleAllowed";
import validate from "../middleware/validate";
import { handleDeleteCompany, handleGetCompanies, handleGetCompanyById, handleUpdateCompany } from "../controller/company.controller";
import {
  paramsIdSchema,
  pagedSearchQuerySchema,
} from "../validation/commonValidation";
import { updateCompanySchema } from "../validation/companyValidationSchema";
const companyRouter = Router();

companyRouter.get(
  "/",
  isAuth,
  isRoleAllowed(["super_admin"]),
  handleGetCompanies
);

companyRouter.get(
  "/:id",
  validate({
        params: paramsIdSchema,
      }),
  isAuth,
  isRoleAllowed(["super_admin"]),
  handleGetCompanyById
);

companyRouter.delete(
    "/:id",
    validate({
          params: paramsIdSchema,
        }),
    isAuth,
    isRoleAllowed(["super_admin"]),
    handleDeleteCompany
  );

companyRouter.put(
  "/",
  validate({
    body: updateCompanySchema,
  }),
  isAuth,
  isRoleAllowed(["tenant_admin"]),
  handleUpdateCompany
);

export default companyRouter;