import {Request, Response, NextFunction} from 'express';
const userHealth = (_req:Request, res:Response, _next:NextFunction)=>{
  res.send("hello userHealth");
}
export default userHealth;