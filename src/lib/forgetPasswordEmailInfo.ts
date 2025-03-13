const forgetPasswordEmailInfo = (info:any)=>{
  const emailData={
   recipient:info?.email || '',
     subject:"Forget password",
     body:`<h2>Hello, User</h2>
  <div>Verify your email</div><div><button><a href="${info.url}/auth/new_password/:${info.token}" target="_blank ">New Password setup</a></button></div>
  `,
     source:'Forget Password',
     sender:"S M Azim Islam",
 };
 return emailData;
}
export default forgetPasswordEmailInfo;