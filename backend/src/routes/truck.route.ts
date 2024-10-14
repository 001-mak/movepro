import { Router } from 'express';
import * as truckController from '../controller/truck.controller'

const truckRouter = Router();
truckRouter.post('/', truckController.handleCreateTruck);

export default truckRouter;