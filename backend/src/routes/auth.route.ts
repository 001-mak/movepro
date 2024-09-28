import { Router } from 'express';
import * as authController from '../controller/auth.controller'
const authRouter = Router();

authRouter.post('/register', authController.handleUserRegister);
authRouter.post('/login', authController.handleUserLogin);
authRouter.post('/forgot-password', authController.handleForgotPassword);
authRouter.post('/reset-password', authController.handleResetPassword);

// authRouter.post('/signup', validate(signupSchema), authController.handleSignUp);

// authRouter.post('/login', authController.handleLogin);

// authRouter.post('/logout', authController.handleLogout);

// authRouter.post('/refresh', authController.handleRefresh);

export default authRouter;
