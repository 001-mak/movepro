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

// for items of categories
inventoryRouter.post('/inventory-group-item',isAuth,inventoryController.handleCreateInventoryGroupItem);
inventoryRouter.get('/inventory-group-item',isAuth,inventoryController.handleGetAllItems);
inventoryRouter.get('/inventory-group-item/sub-items/:group_id',isAuth,inventoryController.handleGetItemsByGroupId);
inventoryRouter.delete('/inventory-group-item/:id', isAuth, inventoryController.handleDeleteItemById);
inventoryRouter.put('/inventory-group-item/:id', isAuth, inventoryController.handleUpdateItemById);
inventoryRouter.get('/inventory-group-item/:id', isAuth, inventoryController.handleGetItemById);
export default inventoryRouter;








