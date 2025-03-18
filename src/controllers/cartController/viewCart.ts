import {Request, Response, NextFunction} from 'express';
import axios from 'axios';
const viewCarts= async(req:Request, res:Response, next:NextFunction)=>{
  const cardSessionId = req.headers['x-card-session-id'] as string;
  console.log(cardSessionId)
  //decliar variable
  let cardData ;
  //body data validate 
   try{
     //get card all product
    const {data} = await axios.get("http://localhost:3001/carts/me",{
     headers:{
       'x-card-session-id':cardSessionId,
       },
   }); 
  if(!data.items)return;
   //all data store
   cardData = data?.items;
   //create array orderItemsSchema data ;
  //check data empty
if(cardData?.length == 0){
  return res.status(400).json({success:false, message:"cardItems is empty"});
};
//create array promise 
const orderDetails = Promise.all(cardData.map(async(item:any)=>{
  const { data: product } = await axios.get(`http://localhost:3001/products/find/${item.productId}`);
    return {
    productId:product.findProduct.productId as string,
    productName:product.findProduct.name as string,
    sku: product.findProduct.sku as string,
    price: product.findProduct.price,
    quantity:item.quantity,
    image:product.findProduct.image,
    color:item.color,
    size:item.size,
  }
}));
// resolve data Promise
const orderItemsData = await orderDetails;
//const subtotal = orderItemsData.reduce((acc:any, item:any)=>acc + item.price, 0);
//const tax= 0;
  //const grandTotal = subtotal + tax;
   const items=orderItemsData.map((item:any)=>({
      ...item,
    }));
return res.status(200).json({
  success:true, message:'view cart successfull',
  result:items,
})
   }catch(error:any){
 console.log(error)
  if(error.status == "400"){
    return res.status(400).json({message:"order session Id is not valid"});
   }
   return res.status(400).json({message:"Internal Server Error"});
  }
}
export default viewCarts;