import {Request, Response,NextFunction} from 'express';
import ProfileModel from '../../models/userModel/schemas';
import {z} from 'zod';
const userData = z.object({
  userId:z.string(),
  name:z.string().optional(),
  email:z.string().email().optional(),
  image:z.string().optional(),
  address:z.string().optional(),
  phone:z.string().optional()
});
 const createProfile =async(req:Request,res:Response, _next:NextFunction)=>{
try{
const users = userData.safeParse(req.body);
if(!users.success){
   res.status(404).json({error: users.error.errors});
   return;
};
const exists = await ProfileModel.findOne({email:users.data.email});
if(exists){
  return res.status(201).json({success:false, message:"Profile Already exists "});
}
const profileAdd =await new ProfileModel(users.data);
if(!profileAdd){
  return res.status(400).json({success:false, message:"User is not Register. Try again"});
}
const result = await profileAdd.save();
if(!result){
  return res.status(400).json({success:false, message:"user create problem"});
};
res.status(201).json({
  success:true,
  message:"user create successfull",
  result:result,
});
}catch(error:any){
  res.send(error.message)
}
}
export default createProfile;