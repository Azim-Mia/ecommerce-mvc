import {Request, Response,NextFunction} from 'express';
import axios from 'axios';
require('dotenv').config();
import  emailInfo from  '../../../lib/forgetPasswordEmailInfo'
import {access_key} from '/data/data/com.termux/files/home/e-commerce-mvc/secret';
import {generateAccessToken} from '/data/data/com.termux/files/home/e-commerce-mvc/servises/generateToken'
import {createAccessCookie} from '/data/data/com.termux/files/home/e-commerce-mvc/servises/makeCookie'
import { AuthUserSchema } from '../../../models/authModel/schemas';
 const forgetPassword =async(req:Request,res:Response, _next:NextFunction)=>{
try{
  const {email} =req.body;
  if(!email){
    return res.status(404).json({success:false, message:"Body Email is Empty"});
  }
  const user = await AuthUserSchema.findOne({email:email});
  if(!user){
    return res.status(404).json({success:false, message:"User Not Found"});
  }
 const accessToken= await generateAccessToken({id:user._id, email:user.email}, access_key, '5m');
 if(!accessToken){
   return res.status(201).json({success:true,message:"accessToken is not create"});
 }
 const info = {
    email:user.email,
    url:"http://localhost:3000",
    token:accessToken,
  }
await createAccessCookie(res,accessToken);
const eamilData = emailInfo(info);
await axios.post("http://localhost:3001/email/send",eamilData);
return res.status(201).json({success:true,message:"Reset yuor Password. Check your email",token:accessToken});
}catch(error:any){
  const errData = error?.errorResponse?.errmsg || error;
  console.log(error);
  return res.status(500).json({success:false, message:"Intrnel server Error", Error:errData});
}
}
export default forgetPassword;