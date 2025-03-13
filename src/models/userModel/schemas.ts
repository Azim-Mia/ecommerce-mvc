const { Schema, model } =require('mongoose');
const profileSchema = new Schema({
  userId:{
    type:String,
    required:[true, 'userId is empty'],
  },
   name:{
    type:String,
  },
    email:{
    type:String,
    default:null,
  },
  bio_data:{
    type:String,
    default:null,
  },
  divition:{
   type:String,
   default:null,
  },
  district:{
   type:String, 
   default:null
  },
  address:{
    type:String,
    trim:true,
    default:null
  },
  phone:{
    type:Number,
    trim:true,
    default:null,
  },
  image:{
    type:String,
    default:"image is empty"
  }
},{timestamp:true});
 const ProfileModel = new model('Profile', profileSchema);
export default ProfileModel;
