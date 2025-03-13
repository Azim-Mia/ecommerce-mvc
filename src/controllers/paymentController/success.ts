import {Request, Response, NextFunction} from 'express';
import { OrderDetailModel } from '/data/data/com.termux/files/home/e-commerce-mvc/src/models/orderModel/schemas'
 const paymentSuccessController=async(req:Request,res:Response,_next:NextFunction)=>{
  const tran_id =req.params.tran_id;
const orderConfirm=await OrderDetailModel.updateOne({tran_id:tran_id},{
    $set:{
      payedStatus:true,
    }
  })
  /*
  if(orderConfirm.modifiedCount>0){
    res.redirect(`http://localhost:3000/payment/success/${tran_id}`);
  }*/
  return res.status(201).json({success:true, message:"payment successfull", orderConfirm});
}
export default paymentSuccessController