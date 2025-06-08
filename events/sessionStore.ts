import { Redis } from 'ioredis';
import clearCard from "/data/data/com.termux/files/home/ecommerce-mvc/servises/clearCard"
const redis = new Redis({
  port: 10971,
  host:'redis-10971.c9.us-east-1-4.ec2.redns.redis-cloud.com',
  username: "default",
  password: '4nkFu4I9c0MDBGHdhsaPkHYGXVeNyp6t',
  db: 0, // Defaults to 0
});
const CHENAL_KEY ='__keyevent@0__:expired';
redis.config('SET', 'notify-keyspace-events','Ex');
redis.subscribe(CHENAL_KEY);
redis.on('message', async(ch, message)=>{
  if(ch == CHENAL_KEY){
    console.log('expired key : ' + message);
  const cardKey = message.split(":").pop();
  if(!cardKey) return;
  clearCard(cardKey);
  }
})
/*this file use root file app */