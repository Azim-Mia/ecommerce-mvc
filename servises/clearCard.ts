import redis from '../config/rdConfig';
import axios from 'axios';
//use session id
const clearCard =async(id:string)=>{
  //get valid card 
const data = await redis.hgetall(`card:${id}`);
//check this value
if(Object.keys(data).length === 0){
  return;
};
//create array 
const items = Object.keys(data).map((key)=>{
  const {inventoryId, quantity} = JSON.parse(data[key]) as {
    inventoryId:string;
    quantity:number;
  };
  return {
    inventoryId, 
    quantity,
    productId:key
  }
});
console.log("clearCard Items", items )
// product inventory 
const request = items.map(async(item)=>{
  console.log("update Id:", item.inventoryId)
  return await axios.put(`http://localhost:3001/inventoris/update/${item.inventoryId}`,{
    quantity:Number(item.quantity),
    actionType:"IN"
  });
});
Promise.all(request);
console.log("inventoryId update");
//clear the card 
await redis.del(`card:${id}`);
}
export default clearCard;