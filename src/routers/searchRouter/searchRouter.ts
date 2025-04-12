import express from 'express';
import {searchController} from '../../../src/controllers/searchController';
const searchRouter= express.Router();
searchRouter.get('/search',searchController as any);
export default searchRouter;