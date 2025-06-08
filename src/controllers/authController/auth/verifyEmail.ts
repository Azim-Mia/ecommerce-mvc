import {Request, Response,NextFunction} from 'express';
import {z} from 'zod';
import axios from 'axios'
import { AuthUserSchema,VerifiedCodeSchema } from '../../../models/authModel/schemas';
import {access_key,refresh_key} from '/data/data/com.termux/files/home/ecommerce-mvc/secret';
import {generateAccessToken,generateRefreshToken} from '/data/data/com.termux/files/home/ecommerce-mvc/servises/generateToken'
import {createAccessCookie,createRefreshCookie} from '/data/data/com.termux/files/home/ecommerce-mvc/servises/makeCookie'
const dataVlidation = z.object({
  code:z.string(),
  email:z.string().email(),
});
const verifyEmail =async(req:Request,res:Response, _next:NextFunction)=>{
try{
  const bodyParse = dataVlidation.safeParse(req.body);
  const userEmail = req.headers['Email'] as string 
  const exists = await VerifiedCodeSchema.findOne({email:bodyParse?.data?.email || userEmail});
  const user = await AuthUserSchema.findOne({email:bodyParse?.data?.email || userEmail});
  console.log(exists);
  if(!exists && !user){
    return res.status(200).json({success:false, messages:"Not Found User"});
  };
  if(exists.status === "USED"){
   return res.status(200).json({success:false,messages:"Verify Code is used"});  
  }
  if(exists.code !== bodyParse?.data?.code){
   return res.status(200).json({success:false,messages:"Verify Code is not Match"}); 
  }
  const existAuthUser= await AuthUserSchema.findOne({email:bodyParse?.data?.email || userEmail});
  if(!existAuthUser){
   return res.status(200).json({success:false,messages:"AuthUserSchema Not Found"}); 
  }
   //update user verification schema
    const successVerifyCodeUpdate = await VerifiedCodeSchema.updateOne({_id:exists._id},{ $set:
      {
    status:"USED"
      }
   });
  if(!successVerifyCodeUpdate){
    return res.status(200).json({success:false,messages:"user not update"});
  }
  //send success email
    await axios.post("http://localhost:3001/email/send",{
    recipient:exists.email,
    subject:"user verify",
    body:"successfull your account verify",
    source:"verify",
    sender:"provider in Bangladesh",
    });
    //cookie, token create
    const accessToken= await generateAccessToken({id:user.authUserId, email:user.email, isLoggedIn:true}, access_key, '5m');
const refresh_token = await generateRefreshToken({id:user.authUserId,email:user.email}, refresh_key, '10380m')
res.setHeader('email', user.email);
await createAccessCookie(res,accessToken);
await createRefreshCookie(res,refresh_token);
    //success response
  return res.status(200).json({success:true,messages:"update successfull"})
}catch(error:any){
  res.status(500).send(error);
}
}
export default verifyEmail;