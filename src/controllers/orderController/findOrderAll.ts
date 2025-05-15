import {Request, Response, NextFunction} from 'express';
import { OrderDetailModel } from '../../models/orderModel/schemas';
const findOrderAll = async(req:Request, res:Response, _next:NextFunction)=>{
  const result = await OrderDetailModel.find();
  if(!result){
    return res.status(404).json({success:false, message:"not found User id"});
  }
  res.status(200).json({success:true, message:"user return successfull",data:result});
}
export default findOrderAll;