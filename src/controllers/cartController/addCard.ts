import {Request, Response, NextFunction} from 'express';
const { v4: uuidv4 } = require('uuid');
import axios from 'axios';
import redis from '../../../config/rdConfig';
import {addCardSchema} from './zodSchema';
import { ttl  } from '../../../secret'
const addCard= async(req:Request, res:Response, _next:NextFunction)=>{
  try{
    const parseBody = addCardSchema.safeParse(req.body);
    if(!parseBody.success){
      return res.status(400).json({success:false, message:parseBody.error.errors});
    }
    // check cardSessionId if exists
    let cardSessionId = (req.headers['x-card-session-id'] as string) || null;
    console.log("Backend Cart add " + cardSessionId)
   if(cardSessionId){
   const exists =  await redis.exists(`sessions:${cardSessionId}`);
     console.log("sessionId is exists :" + exists);
     if(!exists){
       cardSessionId = null;
     }
   };
   //create session id
     if(!cardSessionId){
      cardSessionId = uuidv4();
      await redis.setex(`sessions:${cardSessionId}`, ttl, cardSessionId as string);
      res.setHeader(`x-card-session-id`, cardSessionId as string);
     }
     
     //check the inventory abilable
     const {data } = await axios.get(`http://localhost:3001/inventoris/find/${parseBody.data.inventoryId}`);
     if(data.success == false ){
       return res.status(400).json({success:false, message:"Inventory ID Not Match.."});
     }
     if(data.result.quantity < Number(parseBody.data.quantity) || Number(parseBody.data.quantity) < 1 ){
       return res.status(202).json({success:false, message:"quantity is not ableable"});
     };
     //update inventory 
      await axios.put(`http://localhost:3001/inventoris/update/${parseBody.data.inventoryId}`,{
       quantity:Number(parseBody.data.quantity),
       actionType:"OUT"
     });
    //add item to the card
    //if product exists 
    // lgic parseBody.data.quantity - existing quantity
    
    await redis.hset(`card:${cardSessionId}`, parseBody.data.productId,JSON.stringify({
      inventoryId:parseBody.data.inventoryId,
      quantity:Number(parseBody.data.quantity),
      color:parseBody.data.color,
      size:parseBody.data.size,
    }));
    return res.status(200).json({success:true, message:"add to card successfull", sessionId: cardSessionId});
  }catch(error){
    console.log(error)
    return res.status(500).json({success:false, message:'Internal server error add-to-card'});
  }
}
export default addCard;