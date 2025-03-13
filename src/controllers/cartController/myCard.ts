import {Request, Response, NextFunction} from 'express';
import redis from '../../../config/rdConfig';
//import {addCardSchema} from './zodSchema';
//import { ttl  } from '../envVariable/secret';
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
     const {quantity, inventoryId} = JSON.parse(items[key]) as {
       inventoryId:string,
       quantity:number
     };
     return {
       inventoryId,
       quantity,
       productId:key
     }
   });
   return res.status(200).json({success:true, message:"retun successfull", items:formatItems});
  }catch(error){
    console.log(error);
    return res.status(500).json({success:false, message:"Internal Server Error"});
  }
}
export default myCard;
