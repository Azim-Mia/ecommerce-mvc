import express from 'express';
import {searchController,userSearch} from '../../../src/controllers/searchController';
const searchRouter= express.Router();
searchRouter.get('/product',searchController as any);
searchRouter.get('/users/search',userSearch as any);
export default searchRouter;