import {Router} from 'express'

import * as leadController from '../controller/leads.controller'

const leadRouter=Router()

leadRouter.post(
    '/',leadController.handleCreateLead
);
leadRouter.get(
    '/',
    leadController.handleGetAllLeads
);

leadRouter.get(
    '/:id',
    leadController.handleGetLead
);
leadRouter.delete(
    '/:id',
    leadController.handleDeleteLead
);

export default leadRouter;