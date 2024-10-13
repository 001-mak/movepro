import { Router } from 'express';
import * as materialsController from '../controller/materials.controller';
import isAuth from '../middleware/isAuth';

const materialsRouter = Router();

materialsRouter.post('/', isAuth, materialsController.handleCreateMaterial);


materialsRouter.get('/', isAuth, materialsController.handleGetAllMaterials);


materialsRouter.get('/:id', isAuth, materialsController.handleGetMaterialById);


materialsRouter.put('/:id', isAuth, materialsController.handleUpdateMaterial);


materialsRouter.delete('/:id', isAuth, materialsController.handleDeleteMaterial);


materialsRouter.delete('/', isAuth, materialsController.handleDeleteAllMaterials);

export default materialsRouter;