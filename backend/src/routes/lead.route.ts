import {Router} from 'express'
import isAuth from '../middleware/isAuth'
import validate from '../middleware/validate'
import { leadSchema } from '../validations/lead.validation'

import * as leadController from '../controller/leads.controller'

const leadRouter=Router()
leadRouter.get('/paged',isAuth,leadController.handleGetPagedLead);
leadRouter.post('/',validate({ body: leadSchema}),isAuth,leadController.handleCreateLead);
leadRouter.get('/',isAuth,leadController.handleGetAllLeads);

leadRouter.get('/:id',isAuth,leadController.handleGetLeadById);
leadRouter.delete('/:id',isAuth,leadController.handleDeleteLead);
leadRouter.put('/:id',validate({ body: leadSchema}),isAuth,leadController.handleUpdateLead)
leadRouter.get('/company/:companyId',isAuth, leadController.handleGetLeadsByCompany);


export default leadRouter;