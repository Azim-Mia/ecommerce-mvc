import {Request, Response, NextFunction} from 'express';
import { Product } from '../../models/productModel/schemas.js';
const Delete = async(req:Request,res:Response, _next:NextFunction)=>{
const productId = req.body.productId;
const deleteId = await Product.deleteOne({productId:productId});
if(!deleteId){
return res.status(400).json({success:false, message:"product id is not found"});
}
return res.status(200).json({success:true, message:"product id delete successfull"});
}
export default Delete;