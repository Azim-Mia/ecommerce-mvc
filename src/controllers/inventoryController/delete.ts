import {Request, Response, NextFunction} from 'express'
import {Inventory} from '../../models/inventoryModel/schemas.js';
const Delete = async(req:Request,res:Response, _next:NextFunction)=>{
  try{
  const {id} = req.params;
  const deleteInventory = await Inventory.deleteOne({inventoryId:id});
  if(deleteInventory.deletedCount==0){
    res.json({success:false, message:"not found inventory"})
    return
  }else{
   return res.json({success:true, message:'inventory deleted'}) 
  }
}catch(error:any){
 res.json({success:false,message:"internal problem"}); 
}
  }
  export default Delete;