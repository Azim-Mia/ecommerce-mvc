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
  const {cardSessionId,address,post_code,phone,name} = req.body;
  const response = await fetch("http://localhost:3001/carts/me", {
    method: "GET",
    credentials: "include",
    headers: {
      "x-card-session-id": cardSessionId || "",
      "Content-Type": "application/json",
    },
  });
  const jsonData= await response.json();
  //check cart item 
  if(!jsonData.success){
    return res.json({ success: false, status: response.status, message: response.statusText });
  }
  const email = res.getHeader('email') || req.headers['email'];
  if(!email){
  return res.status(404).json({success:false, message:"Not found getHeader Email"});
}
const user = await AuthUserSchema.findOne({email:email});
if(!user){
  return res.status(404).json({success:false, message:"Email is not Register"});
}
const userId = user.authUserId || '';
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
        cus_name:user?.name || 'yyy',
        cus_email: user?.email || 'customer@example.com',
        cus_add1:address || 'mm',
        cus_add2:'mmm',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode:post_code || "postCode",
        cus_country: 'Bangladesh',
        cus_phone:phone || '01711111111',
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
  let GatewayPageURL = apiResponse.GatewayPageURL;
        res.send({url:GatewayPageURL});
     //create order details 
const gg=await fetch("http://localhost:3001/orders/checkout", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
    userId,
    name,
    email,
    address,
    post_code,
    cardSessionId
  }),
    headers: {
      "x-card-session-id": cardSessionId || "",
      "Content-Type": "application/json",
    },
  });
     const pp = gg.json();
     console.log(pp);
    }).catch((err:any)=>{
      console.log(err.message)
    })
}
export default paymentController
