const emailInfo = (info:any)=>{
  const emailData={
   recipient:info?.email || '',
     subject:"Verify user login now",
     body:`<div>
     <h1>Verify Token ${info?.code}</h1>
    <a href="http://localhost:3000/verify">Active</a>
     </div>`,
     source:'user create',
     sender:"",
 };
 return emailData;
}
export default emailInfo;