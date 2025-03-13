import {Request, Response, NextFunction} from 'express';
//import { OrderDetailModel } from '/data/data/com.termux/files/home/e-commerce-mvc/src/models/orderModel/schemas'
const failPayment=async(_req:Request,res:Response,_next:NextFunction)=>{
return res.send("payment Not success");
}
export default failPayment