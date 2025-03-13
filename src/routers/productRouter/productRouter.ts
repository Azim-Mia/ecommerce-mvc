import express from 'express';
import { Health, Create, Finds, Find, Delete } from '../../../src/controllers/productController';
const productRouter = express.Router();
productRouter.get('/',Health as any);
productRouter.post('/create',Create as any);
productRouter.get('/finds',Finds as any);
productRouter.get('/find/:id',Find as any);
productRouter.delete('/delete/:id', Delete as any);
export default productRouter;