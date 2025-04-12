import {Request, Response, NextFunction} from 'express';
import { Product } from '../../models/productModel/schemas.js';
const Finds = async(_req:Request,res:Response,_next:NextFunction)=>{
try{
  const findProduct = await Product.find().select("name _id productId inventoryId price quantity");
  if(!findProduct){
    res.status(404).json({success:false, message:"Product is not found"});
  return;
  };
  const productLength = findProduct.length;
  res.status(200).json({success:true, message:"Product return successfull",findProduct, productLength});
}catch(error){
  res.status(500).json({success:false, message:"Interneal server problem"});
}
}
export default Finds;