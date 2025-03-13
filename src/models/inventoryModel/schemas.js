import {Schema,model} from 'mongoose';
import mongoose from 'mongoose';
const inventorySchema= new Schema({
  inventoryId:{
   type:String,
  },
  sku:{
    type:String,
    unique:true,
  },
 actionType: {
        type: String,
        enum : ['IN','OUT'],
        default:null,
    },
  quantity:{
    type:Number,
    default:0,
  },
  productId:{
    type:String,
    default:"null",
  },
  historis:{
    type:Array,
  default:[{actionType:"IN",
      quantityChange:0,
      lastQuantity:0,
      newQuantity:0}]
  },
  createAt:{
    type:Date,
    default: Date.now
  },
  updateAt:{
     type:Date,
    default: Date.now,
  }
});
export const Inventory=new model('inventory', inventorySchema);

const historySchema= new Schema({
  historyId:{
   type:String,
   required:[true, 'id is empty'],
  },
  actionType: {
        type: String,
        enum : ['IN','OUT'],
        default:null,
    },
  quantityChange:{
    type:Number,
  },
  lastQuantity:{
    type:Number,
  },
  newQuantity:{
    type:Number,
    default:0,
  },
  inventory:{
    type:Array,
    ref:'inventory'
  },
  inventoryId:{
    type:String,
    ref:'inventory',
  },
  createAt:{
    type:Date,
    default: Date.now
  },
  updateAt:{
     type:Date,
    default: Date.now,
  }
});
export const History=new model('history', historySchema);