import {Request, Response, NextFunction} from 'express';
const cancelPayment=async(_req:Request,res:Response,_next:NextFunction)=>{
return res.send("payment Cancel");
/* if(!res.ok){
   res.redirect(`http://localhost:3000/payment/fail`)
 }*/
}
export default cancelPayment