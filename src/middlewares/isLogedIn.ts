import {Request, Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
require('cookie-parser');
//import axios from 'axios';
require('dotenv').config();
import {access_key} from '/data/data/com.termux/files/home/e-commerce-mvc/secret';
export const isLoggedIn =async(req:Request,res:Response, next:NextFunction)=>{
  const accessToken=req.cookies.accessToken
  const decoded = await jwt.verify(accessToken,access_key);
  if(decoded){
    return res.status(201).json({success:true, message:"User already LoggedIn", isLoggedIn:true});
  }
  next();
}