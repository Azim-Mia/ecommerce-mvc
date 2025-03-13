import express from 'express';
import { emailHealth,sendEmailController,findEmailController} from '../../../src/controllers/emailController';
const emailRouter = express.Router();
emailRouter.get('/',emailHealth);
emailRouter.post('/send', sendEmailController as any);
emailRouter.get('/finds', findEmailController as any);
export default emailRouter;