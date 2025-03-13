import axios from 'axios';
import {Request, Response,NextFunction} from 'express';
import { AuthUserSchema,VerifiedCodeSchema } from '../../../models/authModel/schemas';
import { genareteCode } from  '../../../lib/genareteCode';
import  emailInfo from  '../../../lib/emailInfo'
const sendCode = async(req:Request, res:Response, _next:NextFunction)=>{
  try{
  const code = genareteCode();
  const email = res.getHeader('email') || req.body.email;
  const exits = await AuthUserSchema.findOne({email:email});
  if(!exits){
    return res.status(404).json({success:false, message:"User not found" })
  }
  const info ={
  email:exits.email,
  code:code,
}
  const findEmail = await VerifiedCodeSchema.findOne({email:exits.email});
  if(findEmail){
//exist same table data update
 const update = await VerifiedCodeSchema.findByIdAndUpdate({_id:findEmail._id},{
    $set:
      {
      code:info.code,
      status:"PENDING",
      type:'TOW_FACT_AUTH',
      }
    });
    if(!update){
      return res.status(403).json({success:false, message:"verify code is not update"});
    }
    
    const emailData=emailInfo(info);
   await axios.post("http://localhost:3001/email/send",emailData);
  }else{
    //new create new verify table
   const createVerifyData = await new VerifiedCodeSchema({
    userId:exits.authUserId,
    email:info.email,
    status:'PENDING',
    code:info.code,
  });
  const add = await createVerifyData.save();
      if(!add){
      return res.status(403).json({success:false, message:"verify data is not added"});
    }
    //email data service
    const emailData=emailInfo(info);
   //send email api
   await axios.post("http://localhost:3001/email/send",emailData);
  }
  //create headder
  res.setHeader('Email', info.email);
  return res.status(201).json({message:"send code.Check Email"});
  }catch(err:any){
    return res.status(201).json({error:err});  
  }
}
export default sendCode;