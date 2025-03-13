import {Request, Response,NextFunction} from 'express';
const  jwt = require('jsonwebtoken');
 require('cookie-parser');
import {access_key, refresh_key} from '/data/data/com.termux/files/home/e-commerce-mvc/secret';
import {generateAccessToken} from '/data/data/com.termux/files/home/e-commerce-mvc/servises/generateToken'
import {createAccessCookie} from '/data/data/com.termux/files/home/e-commerce-mvc/servises/makeCookie'
export const verifyToken = async(req:Request,res:Response,next:NextFunction)=>{
  const refreshTokens=req.cookies.refreshToken;
  const accessToken=req.cookies.accessToken;
 if(accessToken){
   const check = await jwt.verify(accessToken,access_key);
   if(!check){
     return res.json({success:false,message:"Rong token login now"})
   }
   next()
 }else{
    if(!refreshTokens){
   res.json({success:false,message:"refreshToken valid login now"})
   return;
  }
  const decoded= await jwt.verify(refreshTokens,refresh_key);
  if(!decoded){
 return res.json({success:false,message:"No verified refreshTokens"})
  }
  res.setHeader('email', decoded.email)
  console.log(decoded)
  const token= await generateAccessToken({id:decoded.id,email:decoded.email},access_key,'10m');
  if(!token){
   return res.json({success:false,message:"Not Create accessToken"}) 
  }
  await createAccessCookie(res,token)
  next();
 }
}
  