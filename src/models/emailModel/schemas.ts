const { Schema, model } =require('mongoose');
const schemasEmail = new Schema({
  recipient:{
    type:String,
  },
  subject:{
    type:String,
  },
  body:{
    type:String,
  },
  source:{
    type:String,
  },
  sender:{
    type:String,
  },
  sendAt:{
    type:Date,
    default: Date.now,
  }
});
export const EmailSchemas = new model('emailSchema', schemasEmail);