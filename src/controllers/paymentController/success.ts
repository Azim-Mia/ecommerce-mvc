import {Request, Response, NextFunction} from 'express';
import axios from 'axios';
import {PaymentSchema} from '/data/data/com.termux/files/home/ecommerce-mvc/src/models/paymentModel/schemas'
const success=async(req:Request,res:Response,_next:NextFunction)=>{
  try{
const tran_id = req.params.tran_id;
const  data= await PaymentSchema.findOne({tran_id:tran_id});
console.log(data)
if(!data){
  return res.status(404).json({success:false,message:"Not found Payment  tran_id"});
}
/*
await PaymentSchema.updateOne({_id:data._id},{
  $set:{
    payedStatus:true,
  }
})
*/
const info ={
  cardSessionId:data.cardSessionId,
  userId:data.userId,
  tran_id:data.tran_id,
  name:data.name,
  email:data.email,
  phone:data.phone,
  address:data.address,
  post_code:data.post_code,
}
const response = await axios.request({
  method:'post',
  withCredentials:true,
  url:'http://localhost:3001/orders/checkout',
  data:info,
  headers:{
    'x-card-session-id':data.cardSessionId,
  }
});
console.log(response.data + 'response')
return res.status(200).json({success:true, message:"successfull payment data", result:response?.data});
}catch(err:any){
  return res.json({error:err});
}
}
export default success