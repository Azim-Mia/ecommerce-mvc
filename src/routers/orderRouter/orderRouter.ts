import express from 'express';
import { orderHealth, checkOut,viewCheckOut } from '../../../src/controllers/orderController';
const orderRouter = express.Router();
orderRouter.get('/',orderHealth);
orderRouter.post('/checkout',checkOut as any);
orderRouter.post('/view/checkout',viewCheckOut as any);
export default orderRouter;