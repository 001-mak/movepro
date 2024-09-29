import {Router} from 'express'

import * as leadController from '../controller/leads.controller'

const leadRouter=Router()
leadRouter.get('/paged',leadController.handleGetPagedLead);
leadRouter.post('/',leadController.handleCreateLead);
leadRouter.get('/',leadController.handleGetAllLeads);

leadRouter.get('/:id',leadController.handleGetLead);
leadRouter.delete('/:id', leadController.handleDeleteLead);
leadRouter.put('/:id',leadController.handleUpdateLead)


export default leadRouter;