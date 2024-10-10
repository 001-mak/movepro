import {Router } from 'express';
import * as inventoryController from '../controller/inventory.controller'
import isAuth from '../middleware/isAuth'


const inventoryRouter=Router();

inventoryRouter.get('/inventory-group/paged', isAuth, inventoryController.handleGetPagedInventoryGroup );
inventoryRouter.post('/inventory-group', isAuth, inventoryController.handleCreateInventoryGroup);
inventoryRouter.get('/inventory-group', isAuth, inventoryController.handleGetAllInventoryGroups);
inventoryRouter.get('/inventory-group/:id', isAuth, inventoryController.handleGetInventoryGroupById);
inventoryRouter.put('/inventory-group/:id', isAuth, inventoryController.handleUpdateInventoryGroup);
inventoryRouter.delete('/inventory-group/:id', isAuth, inventoryController.handleDeleteInventoryGroup);


export default inventoryRouter;








