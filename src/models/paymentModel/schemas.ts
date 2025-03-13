import {Schema, model} from "mongoose";
const paymentSchema = new Schema({
  userId:{
    type:String,
    required:[true, "product id is empty"],
  },
  userName:{
   type:String, 
   required:[true, "name is empty"],
  },
  userEmail:{
    type:String,
    required:[true, "Email is empty"],
  },
  subtotal:{
    type:Number,
    required:[true, "subtotal is empty"],
  },
  tran_id:{
    type:String,
    required:[true, 'tran_id is empty'],
  },
  payedStatus:{
    type: String,
    default:false,
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
export const paymentModel = new model('paymentTable', paymentSchema);