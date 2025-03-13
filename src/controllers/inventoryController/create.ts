import {Request, Response, NextFunction} from 'express'
import {Inventory,History} from '../../models/inventoryModel/schemas.js';
import { v4 as uuidv4 } from 'uuid';
const Create = async(req:Request,res:Response, _next:NextFunction)=>{
try{
const data ={inventoryId:uuidv4(),
actionType:req.body.actionType || null,
...req.body,
  historis:{
      quantityChange:Number(req.body.quantity),
      lastQuantity:0,
      newQuantity:Number(req.body.quantity),
},
}

const matchResult = await Inventory.findOne({sku:req.body.sku});
if(matchResult){
  res.json({success:false,message:"Sku already exits"});
  return;
}
const pendingInventory = new Inventory(data);
const resultInventory = await pendingInventory.save();
//cteate history
const historyData ={historyId:data.inventoryId, ...req.body}
const pendingHistory = new History(historyData);
await pendingHistory.save();
 return res.status(201).json({success:true, message:"create successfull",resultInventory});
}catch(error:any){
  res.status(404).json({message:error.message})
}
}
export default Create;