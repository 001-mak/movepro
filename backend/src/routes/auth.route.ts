import { Router } from 'express';
import * as authController from '../controller/auth.controller'
import validate from '../middleware/validate';
import { userRegisterSchema, userLoginSchema, forgotPassSchema, resetPassSchema } from '../validation/authValidationSchema';
import { handleAdminRegister } from '../controller/superAdmin.comtroller';
import { createAdminSchema } from '../validation/authValidationSchema';
const authRouter = Router();

authRouter.post('/register', validate({ body: userRegisterSchema }), authController.handleUserRegister);
authRouter.post('/login', validate({ body: userLoginSchema }), authController.handleUserLogin);
authRouter.post('/forgot-password',validate({ body: forgotPassSchema }), authController.handleForgotPassword);
authRouter.post('/reset-password',validate({ body: resetPassSchema }), authController.handleResetPassword);

// TEMPORARY | CREATE ADMIN
authRouter.post('/admin/register', validate({ body: createAdminSchema }), handleAdminRegister);






export default authRouter;
