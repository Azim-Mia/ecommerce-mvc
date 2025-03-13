import express from 'express';
import { orderHealth, checkOut } from '../../../src/controllers/orderController';
const orderRouter = express.Router();
orderRouter.get('/',orderHealth);
orderRouter.post('/checkout',checkOut as any);
export default orderRouter;