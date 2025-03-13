import {Schema, model} from "mongoose";
const productSchema = new Schema({
  productId:{
    type:String,
    required:[true, "product id is empty"],
  },
  inventoryId:{
    type:String,
    default:null,
  },
  name:{
   type:String, 
   required:[true, "name is empty"],
  },
  sku:{
    type:String,
    required:[true, "sku is required"],
  },
  description:{
    type:String,
  },
  price:{
    type:Number,
  required:[true, "Price is empty"],
  },
  isBaned:{
   type:Boolean,
   default:false,
  },
  image:{
    type:Array,
    default:["null"],
  },
  status:{
    type: String,
    enum:["DRAFT", "PUBLIST", "UNLISTED"],
    default:"DRAFT",
  },
  createAt:{
    type:Date,
    default:Date.now,
  },
  updateAt:{
    type:Date,
    default:Date.now, 
  }
});
export const Product = new model('product', productSchema);