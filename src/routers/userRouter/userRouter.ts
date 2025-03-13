import express from 'express';
import { userHealth,createProfile ,findProfile} from '../../../src/controllers/userController';
//import {isLogedIn} from '/data/data/com.termux/files/home/e-commerce-mvc/src/middlewares/isLogedIn'
import {verifyToken} from '/data/data/com.termux/files/home/ecommerce-mvc/src/middlewares/verifyToken'
//import {isLoggedIn} from '/data/data/com.termux/files/home/e-commerce-mvc/src/middlewares/isLogedIn'
const userRouter = express.Router();
userRouter.get('/',userHealth);
userRouter.post('/create',createProfile as any);
userRouter.get('/find/:userId',verifyToken as any,findProfile as any);

export default userRouter;