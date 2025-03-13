import express from 'express';
import { cartHealth,addCard,finalyCleanCard, myCard} from '../../../src/controllers/cartController';
const productRouter = express.Router();
productRouter.get('/',cartHealth as any);
productRouter.post('/add-to-cart',addCard as any);
productRouter.get('/clear',finalyCleanCard as any);
productRouter.get('/me',myCard as any);
export default productRouter;