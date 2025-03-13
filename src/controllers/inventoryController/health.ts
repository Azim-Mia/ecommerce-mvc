import {Request, Response, NextFunction} from 'express';
const inventoryHealth = (_req:Request, res:Response, _next:NextFunction)=>{
  res.send("hello inventoryHealth");
}
export default inventoryHealth;