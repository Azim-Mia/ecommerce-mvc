import {Request, Response,NextFunction} from 'express';
import {AuthUserSchema} from '../schemas';
import {z} from 'zod';
const userData = z.object({
  name:z.string(),
  email:z.string().email().optional(),
  address:z.string().optional(),
  phone:z.string().optional()
});
 const updateUser =async(req:Request,res:Response, _next:NextFunction)=>{
const users = userData.safeParse({...req.body});
if(!users.success){
   res.status(404).json({error: users.error.errors});
};
res.status(201).json({
  success:true,
  message:"user create successfull",
  result:users?.data,
});
}
export default updateUser;