import express from 'express';
import {paymentController, paymentSuccessController, failPayment, cancelPayment} from '../../../src/controllers/paymentController';
export const paymentRouter = express.Router();
paymentRouter.post('/', paymentController as any);
paymentRouter.post('/success/:tran_id', paymentSuccessController as any);
paymentRouter.post('/fail/:tran_id', failPayment as any);
paymentRouter.post('/cancel/:tran_id', cancelPayment as any);