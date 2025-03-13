import {Request, Response, NextFunction} from 'express'
import {Inventory} from '../../models/inventoryModel/schemas.js';
const Finds = async(req:Request,res:Response,_next:NextFunction)=>{
  try{
    const result =  await Inventory.find()
    if(!result){
      res.status(404).json({success:false, message:"Not found"})
    }
    res.status(200).json({success:true, message:"inventory return successfull",result:result});
  }catch(err:any){
    res.status(500).json({success:false, message:"server or mongoose problem"})
  }
}
export default Finds;