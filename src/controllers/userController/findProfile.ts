import {Request, Response, NextFunction } from 'express';
import ProfileModel from '../../models/userModel/schemas'
const findProfile =async(req:Request, res:Response, _next:NextFunction)=>{
  const exists = await ProfileModel.findOne({userId:req.params.userId})
  if(!exists){
    return res.status(404).json({
      success:false,
      message:"Profile is not Exists",
    })
  }
 return res.status(200).json({
      success:'successfull',
      message:"Profile is Exists",
      result:exists,
    }) 
}
export default findProfile;