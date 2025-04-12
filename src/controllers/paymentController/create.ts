import {Request, Response, NextFunction} from 'express';
import {PaymentSchema} from '/data/data/com.termux/files/home/ecommerce-mvc/src/models/paymentModel/schemas'
const createPayment = async(req:Request,res:Response,_next:NextFunction)=>{
  const {cardSessionId,userId,tran_id,name,email,phone,address,post_code,district,thana,subtotal,tax,grandTotal,payedStatus,items} =req.body;
  const data = {cardSessionId,userId,tran_id,name,email,phone,address,post_code,district,thana,subtotal,tax,grandTotal,payedStatus,items};
  console.log("AAAAAAAAA  "+data.userId);
  const createNow = await new PaymentSchema(data);
  const payload = await createNow.save();
  if(!payload){
    return res.status(404).json({success:false, message:"payment data is not create"})
  }
return res.status(200).json({success:true, message:"payment data is create successfull"})
}
export default createPayment;