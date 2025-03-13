import {Request, Response, NextFunction} from 'express';
const Health = async(_req:Request, res:Response, _next:NextFunction)=>{
  res.status(200).json({
    message:"user return"
  })

}
export default Health;