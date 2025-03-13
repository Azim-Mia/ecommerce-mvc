import {Request, Response, NextFunction} from 'express'
import {EmailSchemas}  from '../../models/emailModel/schemas';
import emailWithNodeMailer from '../../../servises/sendEmail';
const sendEmailController = async(req:Request, res:Response, _next:NextFunction)=>{
  try{
    const emailData = {...req.body};
    console.log(emailData);
    await emailWithNodeMailer(emailData);
   const storeEmailData =new EmailSchemas({
     recipient:emailData.recipient,
     subject:emailData.subject,
     body:emailData.body,
     source:emailData.source,
     sender:emailData.sender,
   });
   const send = await storeEmailData.save();
  return res.status(200).json({success:true, message:"send email successfull", result:send});
  }catch(error){
    return res.status(500).send(error);
    console.log(error);
  }
}
export default sendEmailController;