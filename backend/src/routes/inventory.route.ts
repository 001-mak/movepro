import {Router } from 'express';
import * as inventoryController from '../controller/inventory.controller'
import isAuth from '../middleware/isAuth'
import isRoleAllowed from "../middleware/isRoleAllowed";
import { inventoryGroupItemSchema,inventoryGroupSchema } from '../validation/inventory.validation';
import validate from '../middleware/validate';

const inventoryRouter=Router();

inventoryRouter.get('/inventory-group/paged', isAuth, isRoleAllowed(["tenant_admin"]),inventoryController.handleGetPagedInventoryGroup );
inventoryRouter.post('/inventory-group',validate({ body: inventoryGroupSchema }), isAuth,isRoleAllowed(["tenant_admin"]), inventoryController.handleCreateInventoryGroup);
inventoryRouter.get('/inventory-group', isAuth,isRoleAllowed(["tenant_admin"]), inventoryController.handleGetAllInventoryGroups);
inventoryRouter.get('/inventory-group/:id', isAuth,isRoleAllowed(["tenant_admin"]), inventoryController.handleGetInventoryGroupById);
inventoryRouter.put('/inventory-group/:id', validate({ body: inventoryGroupSchema }),isAuth, isRoleAllowed(["tenant_admin"]),inventoryController.handleUpdateInventoryGroup);
inventoryRouter.delete('/inventory-group/:id', isAuth,isRoleAllowed(["tenant_admin"]), inventoryController.handleDeleteInventoryGroup);

// for items of categories
inventoryRouter.post('/inventory-group-item',validate({ body: inventoryGroupItemSchema}),isAuth,isRoleAllowed(["tenant_admin"]),inventoryController.handleCreateInventoryGroupItem);
inventoryRouter.get('/inventory-group-item',isAuth,isRoleAllowed(["tenant_admin"]),inventoryController.handleGetAllItems);
inventoryRouter.get('/inventory-group-item/sub-items/:group_id',isAuth,isRoleAllowed(["tenant_admin"]),inventoryController.handleGetItemsByGroupId);
inventoryRouter.delete('/inventory-group-item/:id', isAuth, isRoleAllowed(["tenant_admin"]),inventoryController.handleDeleteItemById);
inventoryRouter.put('/inventory-group-item/:id',validate({ body: inventoryGroupItemSchema}), isAuth,isRoleAllowed(["tenant_admin"]), inventoryController.handleUpdateItemById);
inventoryRouter.get('/inventory-group-item/:id', isAuth,isRoleAllowed(["tenant_admin"]), inventoryController.handleGetItemById);
export default inventoryRouter;








