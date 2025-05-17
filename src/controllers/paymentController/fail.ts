import {Request, Response, NextFunction} from 'express';
import {PaymentSchema} from '/data/data/com.termux/files/home/ecommerce-mvc/src/models/paymentModel/schemas'
const failPayment=async(req:Request,res:Response,_next:NextFunction)=>{
const tran_id = req.params.tran_id;
const result = await PaymentSchema.findOneAndDelete({tran_id:tran_id});
  if(!result){
    return res.status(404).json({success:false,message:"Not found payment Data"});
  }
  res.redirect('http://localhost:3000/payment/success')
return;
}
export default failPayment