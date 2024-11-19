import { Router } from 'express';
import * as materialsController from '../controller/materials.controller';
import isAuth from '../middleware/isAuth';
import validate from '../middleware/validate';
import isRoleAllowed from "../middleware/isRoleAllowed";
import {materialValidationSchema} from '../validation/material.validation';
import { pagedSearchQuerySchema } from "../validation/commonValidation";

const materialsRouter = Router();
materialsRouter.post('/',validate({ body: materialValidationSchema}), isAuth,isRoleAllowed(["tenant_admin"]), materialsController.handleCreateMaterial);
materialsRouter.get(
    "/paged",
    validate({
      query: pagedSearchQuerySchema,
    }),
    isAuth,
    isRoleAllowed(["tenant_admin"]),
    materialsController.handleGetPagedAllMaterials
  );


materialsRouter.get('/', isAuth,isRoleAllowed(["tenant_admin"]), materialsController.handleGetAllMaterials);


materialsRouter.get('/:id', isAuth,isRoleAllowed(["tenant_admin"]), materialsController.handleGetMaterialById);


materialsRouter.put('/:id',validate({ body: materialValidationSchema}), isAuth,isRoleAllowed(["tenant_admin"]), materialsController.handleUpdateMaterial);


materialsRouter.delete('/:id', isAuth, isRoleAllowed(["tenant_admin"]),materialsController.handleDeleteMaterial);


materialsRouter.delete('/', isAuth,isRoleAllowed(["tenant_admin"]), materialsController.handleDeleteAllMaterials);

export default materialsRouter;