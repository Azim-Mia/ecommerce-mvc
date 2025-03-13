import redis from '../../../config/rdConfig';
import {Request, Response, NextFunction} from 'express';
const finalyCleanCard= async(req:Request, res:Response, _next:NextFunction)=>{
  try{
  const cardSessionId =(req.headers[`x-card-session-id`] as string ) || null;
  if(!cardSessionId){
    return res.status(400).json({success:false, message:"cardSessionId is x-card-session-id empty"});
  }
  // check the store sessionId
   const exists = await redis.exists(`sessions:${cardSessionId}`);
  if(!exists){
    delete req.headers['x-card-session-id'];
    return res.status(400).json({success:false, message:"card sessions is not exists"});
  }
    await redis.del(`card:${cardSessionId}`);
    await redis.del(`sessions:${ cardSessionId}`)
    delete req.headers['x-card-session-id'];
    return res.status(200).json({success:true, message:"all clear card"});
  }catch(error){
    console.log(error);
    res.status(500).json({seccess:false, message:"interner Server Error"})
  }
}
export default finalyCleanCard;