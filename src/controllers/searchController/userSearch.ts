import {Request, Response, NextFunction} from 'express';
//import searchService from '/data/data/com.termux/files/home/ecommerce-mvc/servises/searchService'
import {AuthUserSchema} from '../../models/authModel/schemas'
const userSearch =async(req:Request,res:Response,_next:NextFunction)=>{
  try{
    const email = req.query.email as string;
    const existUser = await AuthUserSchema.find();
    console.log(existUser);
    const title = existUser.email;
  const result = title.indexOf(email);
return res.status(201).json({
success:true,
message:'search items successfull',
result
});
  }catch(error:any){
    return res.status(500).json({
      success:false,
      message:'search problem',
    })
  }
}
export default userSearch;