import {Request, Response, NextFunction} from 'express';
import searchService from '/data/data/com.termux/files/home/ecommerce-mvc/servises/searchService'
import { Product } from '../../models/productModel/schemas.js';
const searchController =async(req:Request,res:Response,_next:NextFunction)=>{
  try{
const result = await searchService(Product,req);
return res.status(201).json({
success:true,
message:'search items successfull',
result
});
  }catch(error:any){
    return res.status(500).json({
      success:false,
      message:'search problem'
    })
  }
}
export default searchController;