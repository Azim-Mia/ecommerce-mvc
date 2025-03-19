import express from 'express';
import {registerUser,findAllUser,findSingleUser,loginUser,verifyEmail,verifyUser, sendCode, QuaryId,forgetPassword,forgetPasswordVerify, logout} from '../../../src/controllers/authController';
//import {verifyToken} from '/data/data/com.termux/files/home/ecommerce-mvc/src/middlewares/verifyToken'
//import {isLoggedIn} from '/data/data/com.termux/files/home/e-commerce-mvc/src/middlewares/isLogedIn'
const authRouter = express.Router();
authRouter.post('/users/register',registerUser as any);
authRouter.get('/users/finds',findAllUser as any);
authRouter.get('/users/find/:id',findSingleUser as any);
authRouter.post('/users/login',loginUser as any);
authRouter.post('/users/email/verify',verifyEmail as any);
authRouter.post('/users/verify/token',verifyUser as any);
authRouter.post('/users/send/code',sendCode as any);
authRouter.get('/users/q', QuaryId as any);
authRouter.post('/users/password/forget', forgetPassword as any);
authRouter.post('/users/password/forget/verify/:token', forgetPasswordVerify as any);
authRouter.get('/users/logout', logout as any);
export default authRouter;