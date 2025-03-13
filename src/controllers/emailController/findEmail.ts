import {Request, Response, NextFunction} from 'express'
import {EmailSchemas}  from '../../models/emailModel/schemas';
const findEmailController = async(req:Request, res:Response, _next:NextFunction)=>{
const result = await EmailSchemas.find();
if(!result){
  return res.status(404).json({success:false, messages:"Email find Problem"})
};
return res.status(200).json({success:true, message:"email return successfull",payload:result});
}
export default findEmailController