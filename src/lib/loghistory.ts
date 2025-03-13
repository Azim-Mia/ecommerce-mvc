//import {z} from 'zod';
//import mongoose from 'mongoose';
//import bcrypt from 'bcryptjs'
//import jwt from 'jsonwebtoken';
//import axios from 'axios';
import {LoginHistorySchema} from '/data/data/com.termux/files/home/ecommerce-mvc/src/models/authModel/schemas';

//randomNum code generate
type historyData ={
  userId:string,
  ipAddress:string,
  userAgent:string,
  attempt:string,
  description:string,
};

//export loghistory
export const loghistory =async (info:historyData)=>{
await LoginHistorySchema.insertMany([
    {
      userId:info.userId,
  ipAddress:info.ipAddress,
  userAgent:info.userAgent,
  attempt:info.attempt,
  description:info.description,
    },
    ]);
};