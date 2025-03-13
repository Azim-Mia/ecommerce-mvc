import {Request, Response, NextFunction} from 'express';
const orderHealth = (_req:Request, res:Response, _next:NextFunction)=>{
  res.send("hello orderHealth");
}
export default orderHealth;