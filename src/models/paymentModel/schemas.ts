const { Schema, model } =require('mongoose');
const orderSchema= new Schema({
  cardSessionId:{
    type:String,
    required:[true, 'cardSessionId is empty'],
  },
  userId:{
    type:String,
  },
  tran_id:{
   type:String, 
   required:[true, "tran_id is empty"],
  },
  name:{
    type:String,
    trim:true,
    tolowercase:true,
    required:[true, "not empt name"],
    minLength:[3, 'min length three character'],
    maxLength:[100, "max length 100"]
  },
  email:{
    type:String,
    unique: false,
    trim:true,
    tolowercase:true,
    required:[true, "not empt Email"],
    maxLength:[100, "max length 100"],
  },
  phone:{
    type:String,
  },
  address:{
    type:String,
    required:[true, 'permanent_address is empty'],
  },
  post_code:{
    type:Number,
  },
  district:{
    type:String,
  },
  thana:{
    type:String,
  },
   subtotal:{
     type:Number,
     default:0
   },
   tax:{
     type:Number,
     default:0
   },
   grandTotal:{
     type:Number,
     default:0,
   },
   payedStatus:{
     type:String,
     default:false
   },
   items:[],
  createAt:{
    type:Date,
    default:Date.now,
  },
  updateAt:{
    type:Date,
    default:Date.now,
  }
},{timestamp:true});
export const PaymentSchema = new model('payment', orderSchema);