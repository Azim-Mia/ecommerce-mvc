import {Request, Response, NextFunction} from 'express';
import redis from '../../../config/rdConfig';
//import {addCardSchema} from './zodSchema';
//import { ttl  } from '../envVariable/secret';
import axios from 'axios';
const myCard= async(req:Request, res:Response, next:NextFunction)=>{
  try{
    const cardSessionId = req.headers['x-card-session-id'] as string || null; 
    if(!cardSessionId){
      return res.status(400).json({success:false, data:[{}]});
    }
    const session = await redis.exists(`sessions:${cardSessionId}`);
    if(!session){
      await redis.del(`card:${cardSessionId}`)
     return res.status(400).json({success:false, data:[{}]}); 
    }
    const items = await redis.hgetall(`card:${cardSessionId}`);
    if(Object.keys(items).length === 0){
      return res.status(200).json({success:false, message:[]});
    }

  //formatItems the data 
   const formatItems = Object.keys(items).map(key=>{
     const {quantity, inventoryId,color,size} = JSON.parse(items[key]) as {
       inventoryId:string,
       quantity:number,
       color:string,
       size:string
     };
     return {
       inventoryId,
       productId:key,
       quantity,
       color,
       size
     }
   });
   const orderDetails = Promise.all(formatItems.map(async(item:any)=>{
  const { data: product } = await axios.get(`http://localhost:3001/products/find/${item.productId}`);
    return {
    price: product.findProduct.price,
    quantity:item.quantity,
    total: product.findProduct.price * item.quantity,
  }
}));
  const orderItemsData = await orderDetails;
const subtotal = orderItemsData.reduce((acc, item)=>acc + item.total, 0);
   return res.status(200).json({success:true, message:"retun successfull", items:formatItems,subtotal});
  }catch(error){
    console.log(error);
    return res.status(500).json({success:false, message:"Internal Server Error"});
  }
}
export default myCard;
