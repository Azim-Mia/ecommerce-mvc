import {Request, Response, NextFunction} from 'express'
import {Inventory,History} from '../../models/inventoryModel/schemas.js';
const Update =async(req:Request,res:Response,_next:NextFunction)=>{
  try{
    const {id} = req.params;
    const data ={...req.body}
    const inventory = await Inventory.findOne({inventoryId:id});
   const inventoryId = inventory._id;
   const inventoryIdFind = inventory.inventoryId;
    if(!inventory){
      res.status(404).json({success:false, message:"inventory not found"})
      return;
    }
   //change quantity
    let newQuantity = inventory.quantity;
    if(data.actionType == "IN"){
      newQuantity += Number(data.quantity);
    }else{
      newQuantity -= Number(data.quantity);
    };
    
  const updateOptions= { new:true, runValidators:true, context:'query'};
    const filter =  {
    inventoryId:inventoryIdFind,
  quantity:Number(newQuantity),
  actionType:req.body.actionType,
    historis:{
    historyId:inventoryIdFind,
      actionType:data.actionType,
      quantityChange:Number(data.quantity),
     newQuantity:newQuantity,
     lastQuantity:inventory.quantity || 0
    }
  }
  //update Inventory
    const updateResult = await Inventory.findByIdAndUpdate(inventoryId,filter,updateOptions);
    
    //updata history 
      //create a new history
  const historyResult =new History({historyId:inventoryIdFind,actionType:data.actionType,
      quantityChange:data.quantity,
     newQuantity:newQuantity,
     lastQuantity:inventory.quantity || 0});
  await historyResult.save();
  //end history creade
  
    res.json({success:true, message:"update successfull", result:updateResult});
  }catch(error:any){
    res.status(500).json({message:error.message})
  }
}
export default Update;