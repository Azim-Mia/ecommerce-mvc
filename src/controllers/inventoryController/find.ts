import {Request, Response, NextFunction} from 'express'
import {Inventory, History} from '../../models/inventoryModel/schemas.js';
const Find = async(req:Request,res:Response,_next:NextFunction)=>{
  try{
  const {id} =req.params;
    const findInventory = await Inventory.findOne({inventoryId:id})
    const history = await History.find();
    //decending History
    const dscn = history.toSorted((a:any,b:any)=>b.createAt - a.createAt);
    if(!findInventory){
      res.json({success:false, message:"Inventory Id not found. Correct Id parse body"});
      return
    }else{
      res.json({success:true, message:"return successfull",result:findInventory, History:dscn});
    }
  }catch(error:any){
    res.json({success:false, message:"Internal problem"});
  }
}
export default Find;