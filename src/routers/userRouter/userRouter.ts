import express from 'express';
import { userHealth,createProfile ,findProfile} from '../../../src/controllers/userController';
const userRouter = express.Router();
userRouter.get('/',userHealth);
userRouter.post('/create',createProfile as any);
userRouter.get('/find/',findProfile as any);

export default userRouter;