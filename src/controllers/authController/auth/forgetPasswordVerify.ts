import {Request, Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
//import axios from 'axios';
require('dotenv').config();
import {access_key} from '/data/data/com.termux/files/home/e-commerce-mvc/secret';
import { AuthUserSchema } from '../../../models/authModel/schemas';
//const user_port = process.env.USER_SERVER || "http://localhost:4003";
 const forgetPasswordVerify =async(req:Request,res:Response, _next:NextFunction)=>{
try{
  const {token} =req.params;
  const {password} =req.body;
 if(token === ''){
    return res.status(404).json({success:false, message:"Body token is Empty"});
  }
  const decoded:any = await jwt.verify(token, access_key)
  if(!decoded){
    return res.status(404).json({success:false, message:"Not verified user token"});
  };
  //create update
  if(!password){
    return res.status(404).json({success:true,message:"password is empty"});
  }
const updateOptions= { new:true, runValidators:true, context:'query'};
let updates: { [key: string]: any } = {};
for(let key in req.body){
  if(['password'].includes(key)){
      updates[key]=req.body[key];
    }
}
const result =await AuthUserSchema.findByIdAndUpdate({_id:decoded.id},updates,updateOptions)
    if(!result){
      res.json({success:false, message:"user not Update"})
    }
  return res.status(201).json({success:true,message:"successfull verify"});
}catch(error:any){
  const errData = error?.errorResponse?.errmsg || error;
  console.log(error);
  return res.status(500).json({success:false, message:"Intrnel server Error", Error:errData});
}
}
export default forgetPasswordVerify;