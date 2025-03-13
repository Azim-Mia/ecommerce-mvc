import {Request, Response, NextFunction} from 'express';
const cartHealth = (_req:Request, res:Response, _next:NextFunction)=>{
  res.send("hello cart");
}
export default cartHealth;