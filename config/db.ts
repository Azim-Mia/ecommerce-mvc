import mongoose from 'mongoose';
import {db_url} from '../secret.js';
const connectDB=async()=>{
  try{
    await mongoose.connect(db_url);
    console.log("E-commerce-mvc connection successfull")
    //process.exit(1);
  }catch(err:any){
  console.log(err.message)
  }
}
export default connectDB;