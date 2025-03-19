import {Request, Response, NextFunction} from 'express';
const { v4: uuidv4 } = require('uuid');
//import axios from 'axios';
require('dotenv').config();
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false //true for live, false for sandbox
import {AuthUserSchema} from '/data/data/com.termux/files/home/ecommerce-mvc/src/models/authModel/schemas'
const paymentController=async(req:Request,res:Response, _next:NextFunction)=>{
  const {email,address} = req.body;
const exist = await AuthUserSchema.findOne({email:email});
if(!exist){
  return res.status(404).json({success:false, message:"Email is not Register"});
}
console.log(exist)
  const tran_id=uuidv4();
   const data = {
        total_amount:900,
        currency: 'BDT',
        tran_id:tran_id, // use unique tran_id for each api call
        success_url: `http://localhost:3001/payment/success/${tran_id}`,
        fail_url: `http://localhost:3001/payment/fail/${tran_id}`,
        cancel_url: `http://localhost:3001/payment/cancel/${tran_id}`,
        ipn_url: 'http://localhost:3001/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name:'yyy',
        cus_email: 'customer@example.com',
        cus_add1:address || 'mm',
        cus_add2:'mmm',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode:"postCode",
        cus_country: 'Bangladesh',
        cus_phone:'01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: "address",
        ship_add2:'hhh',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
   // console.log(sslcz);
    sslcz.init(data)
    .then(async(apiResponse:any)=> {
      if(apiResponse.status !== 'SUCCESS'){
        return res.status(400).json({success:false,message:'Payment is not success'});
      }
        // Redirect the user to payment gateway
        console.log(apiResponse);
  let GatewayPageURL = apiResponse.GatewayPageURL;
        res.send({url:GatewayPageURL});
//redirect fail payment route
    }).catch((err:any)=>{
      console.log(err.message)
    })
}
export default paymentController

 // store tran_id oayment success
/* const confirmOrder ={
   tran_id:data?.tran_id,
   userName:data?.cus_name,
   userEmail:data?.cus_email,
   subtotal:data?.total_amount,
   address:'hhhh',
 };
 const result =await confirmOrder.save();
 console.log(result);
 if(!result){
   return res.send("somthing problem payment")
 }*/