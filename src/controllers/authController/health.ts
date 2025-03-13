import {Request, Response, NextFunction} from 'express';
const createProduct = (_req:Request, res:Response, _next:NextFunction)=>{
  res.send("hello product");
}
export default createProduct;