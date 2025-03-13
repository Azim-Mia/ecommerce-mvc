import {Request, Response,NextFunction} from 'express';
const { v4: uuidv4 } = require('uuid');
import jwt from 'jsonwebtoken'
import axios from 'axios';
require('dotenv').config();
import { AuthUserSchema } from '../../models/authModel/schemas';
import {z} from 'zod';
//const email_service = process.env.EMAIL_SERVICE || "http://localhost:4005";
const userData = z.object({
  authUserId:z.string(),
  name:z.string(),
  email:z.string().email(),
  password:z.string(),
  image:z.string().optional(),
});
 const registerUser =async(req:Request,res:Response, _next:NextFunction)=>{
try{
  // decliyar variablea
const bodyParse = userData.safeParse({authUserId:uuidv4(),...req.body});
if(!bodyParse.success){
   res.status(404).json({error: bodyParse.error.errors});
   return;
};
const emailMatch :any = bodyParse?.data?.email;
const exits =await AuthUserSchema.findOne({email:emailMatch});
 if(exits){
   return res.status(400).json({success:false, message:"User already registred"});
   return;
 };
const  userAdd = new AuthUserSchema(bodyParse.data);
if(!userAdd){
 res.status(203).json({success:false, message:"something Problem User not Create.Try again"}); 
 return;
};
//create Verify Token
 const {authUserId,name, email,verified,role} = userAdd;
 const tokenData ={authUserId:authUserId, name:name, email:email, password:bodyParse.data?.password, verified:verified, role:role};
 
 const token = await jwt.sign(tokenData, 'azim', {expiresIn:'1h'});
 const emailData={
   recipient:req.body.email,
     subject:"Verify User now",
     body:`<div>
     <h1>Verify Token ${token}</h1>
    <a href="http://localhost:3000/verify/:${token}">Active</a>
     </div>`,
     source:'user create',
     sender:req.body.name,
 };
 // send email Position 
 await axios.post("http://localhost:3001/email/send",emailData);
return res.status(201).json({
   success:true,
   message:'check your email. verify user now',
   payload:{
     token:token,
   },
 });
}catch(error:any){
console.log(error);
  return res.status(500).json({success:false, message:"Intrnel server Error"});
}
}
export default registerUser;