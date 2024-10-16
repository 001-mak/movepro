import { Router } from 'express';
import * as materialsController from '../controller/materials.controller';
import isAuth from '../middleware/isAuth';
import validate from '../middleware/validate';
import {materialValidationSchema} from '../validations/material.validation';

const materialsRouter = Router();

materialsRouter.post('/',validate({ body: materialValidationSchema}), isAuth, materialsController.handleCreateMaterial);


materialsRouter.get('/', isAuth, materialsController.handleGetAllMaterials);


materialsRouter.get('/:id', isAuth, materialsController.handleGetMaterialById);


materialsRouter.put('/:id',validate({ body: materialValidationSchema}), isAuth, materialsController.handleUpdateMaterial);


materialsRouter.delete('/:id', isAuth, materialsController.handleDeleteMaterial);


materialsRouter.delete('/', isAuth, materialsController.handleDeleteAllMaterials);

export default materialsRouter;