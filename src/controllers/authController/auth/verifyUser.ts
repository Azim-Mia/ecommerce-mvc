import {Request, Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import axios from 'axios';
require('dotenv').config();
import { AuthUserSchema } from '../../../models/authModel/schemas';
//const user_port = process.env.USER_SERVER || "http://localhost:4003";
 const verifyUser =async(req:Request,res:Response, _next:NextFunction)=>{
try{
  const {token} =req.body;
  if(!token){
    return res.status(404).json({success:false, message:"Body token is Empty"});
  }
  const decoded:any = await jwt.verify(token, 'azim');
  console.log(decoded)
  if(!decoded){
    return res.status(404).json({success:false, message:"Not verified user token"});
  };
  //create User
  const successUser = await AuthUserSchema.create(decoded);
 //update user
 if(!successUser){
   return res.status(404).json({
     success:false,
     message:"User Not Register. Try again"
   })
 }
  await AuthUserSchema.findByIdAndUpdate({_id:successUser._id},{ $set:
      {
    verified:true,
    status:"ACTIVE"
      }
   });
   await axios.post('http://localhost:3001/profile/create',{userId:decoded.authUserId,email:decoded.email});
  return res.status(201).json({success:true,message:"successfull verify"});
}catch(error:any){
  const errData = error?.errorResponse?.errmsg || error;
  console.log(error);
  return res.status(500).json({success:false, message:"Intrnel server Error", Error:errData});
}
}
export default verifyUser;