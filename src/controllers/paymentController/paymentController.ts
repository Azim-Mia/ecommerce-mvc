import {Request, Response, NextFunction} from 'express';
const { v4: uuidv4 } = require('uuid');
import axios from 'axios';
//require('dotenv').config();
const jwt = require('jsonwebtoken');
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false //true for live, false for sandbox
import {refresh_key} from '/data/data/com.termux/files/home/ecommerce-mvc/secret';
const paymentController=async(req:Request,res:Response, _next:NextFunction)=>{
  const {cardSessionId,address,post_code,phone,name} = req.body;
  console.log(cardSessionId,address,name,post_code,phone)
  if(!cardSessionId || !name || !post_code || !phone || !address){
    return res.status(404).json({success:false, message:"Not found info"});
  }
  const response = await axios.get("http://localhost:3001/carts/me", {
    withCredentials:true,
    headers: {
      "x-card-session-id": cardSessionId || "null",
    },
  });
  const carts= await response.data;
  console.log(carts)
  //check cart item 
  if(!carts.success){
    return res.json({ success: false, status: response.status, message: 'cart is empty' });
  }
  const refreshTokens=req.cookies.refreshToken;
  console.log("cookie is not found R " + refreshTokens)
  if(!refreshTokens){
  return res.status(404).json({success:false, message:"Not found refreshTokens"});
}
  const user = await jwt.verify(refreshTokens,refresh_key);
  if(!user){
  return res.status(404).json({success:false, message:"Not found user"});
}
  const tran_id=uuidv4();
   const data = {
        total_amount:carts.subtotal,
        currency: 'BDT',
        tran_id:tran_id, // use unique tran_id for each api call
        success_url: `http://localhost:3001/payment/success/${tran_id}`,
        fail_url: `http://localhost:3001/payment/fail/${tran_id}`,
        cancel_url: `http://localhost:3001/payment/cancel/${tran_id}`,
        ipn_url: 'http://localhost:3001/ipn',
        shipping_method: 'Courier',
        product_name: 'any',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name:user?.name || 'yyy',
        cus_email: user?.email || 'customer@example.com',
        cus_add1:address || 'mm',
        cus_add2:address ||'mmm',
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
     const info ={
    cardSessionId:cardSessionId,
    userId:user?.id,
    tran_id:data.tran_id,
    name:name,
    email:user.email,
    phone:phone,
    address:address || "jamalpur",
    subtotal:carts.subtotal,
    post_code:post_code,
    items:carts.items,
  } as any
  console.log(info)
const gg=await axios.post("http://localhost:3001/payment/create",info);
     const pp = gg.data;
     console.log("checkout details " + pp);
    }).catch((err:any)=>{
      console.log(err.message)
    })
}
export default paymentController;