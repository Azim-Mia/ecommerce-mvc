import {Request, Response, NextFunction} from 'express';
const emailHealth = (_req:Request, res:Response, _next:NextFunction)=>{
  res.send("hello emailHealth");
}
export default emailHealth;