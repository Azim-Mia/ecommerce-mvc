import express from 'express';
import { orderHealth, checkOut,findOrderAll,ordersFindUser} from '../../../src/controllers/orderController';
const orderRouter = express.Router();
orderRouter.get('/',orderHealth);
orderRouter.get('/finds',findOrderAll as any);
orderRouter.get('/find',ordersFindUser as any);
orderRouter.post('/checkout',checkOut as any);
export default orderRouter;