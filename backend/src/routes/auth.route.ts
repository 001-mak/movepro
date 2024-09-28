import { Router } from 'express';
import * as authController from '../controller/auth.controller'
const authRouter = Router();

authRouter.post('/register', authController.handleUserRegister);

// authRouter.post('/signup', validate(signupSchema), authController.handleSignUp);

authRouter.post('/login', authController.handleLogin);

// authRouter.post('/logout', authController.handleLogout);

// authRouter.post('/refresh', authController.handleRefresh);



export default authRouter;
