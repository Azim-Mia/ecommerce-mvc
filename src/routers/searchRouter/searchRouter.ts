import express from 'express';
import {searchController,orderSearch} from '../../../src/controllers/searchController';
const searchRouter= express.Router();
searchRouter.get('/filter/product',searchController as any);
searchRouter.get('/filter/orders',orderSearch as any);
export default searchRouter;