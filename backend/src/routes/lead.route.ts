import {Router} from 'express'
import isAuth from '../middleware/isAuth'
import validate from '../middleware/validate'
import { leadSchema } from '../validation/lead.validation'
import isRoleAllowed from "../middleware/isRoleAllowed";
import * as leadController from '../controller/leads.controller'

const leadRouter=Router()

leadRouter.post('/',validate({ body: leadSchema}),isAuth,leadController.handleCreateLead);
leadRouter.get('/',isAuth, isRoleAllowed(["super_admin", "tenant_admin"]),leadController.handleGetLeads);

leadRouter.get('/:id',isAuth, isRoleAllowed(["super_admin", "tenant_admin"]),leadController.handleGetLeadById);
leadRouter.delete('/:id',isAuth, isRoleAllowed(["super_admin", "tenant_admin"]), isRoleAllowed(["super_admin", "tenant_admin"]),leadController.handleDeleteLead);
leadRouter.put('/:id',validate({ body: leadSchema}), isRoleAllowed(["super_admin", "tenant_admin"]),isAuth,leadController.handleUpdateLead)
leadRouter.get('/company/:companyId',isAuth,isRoleAllowed(["super_admin", "tenant_admin"]), leadController.handleGetLeadsByCompany);


export default leadRouter;