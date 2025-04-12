import connectDB from './config/db';
import {default as app } from './app';
require('dotenv').config();
const server_port = process.env.SERVER_PORT || 3001;
app.listen(server_port,()=>{
  try{
    console.log(`http://localhost:${server_port}`);
  connectDB()
  }catch(err:any){
    console.log(err)
  }
});