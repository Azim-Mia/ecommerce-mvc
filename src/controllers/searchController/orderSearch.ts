import {Request, Response, NextFunction} from 'express';
import searchService from '/data/data/com.termux/files/home/ecommerce-mvc/servises/searchService'
import {OrderDetailModel} from '../../models/orderModel/schemas'
const orderSearch =async(req:Request,res:Response,_next:NextFunction)=>{
  try{
const result = await searchService(OrderDetailModel,req);
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
export default orderSearch;