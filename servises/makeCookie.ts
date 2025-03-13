export const createAccessCookie=(res:any, accessToken:string)=>{
  res.cookie('accessToken',accessToken,{
    maxAge:10*60*1000,
    httpOnly:true,
   // secure:true,
    //sameSide:'none',
    date:new Date(),
  })
};
export const createRefreshCookie=(res:any, refreshToken:string)=>{
  res.cookie("refreshToken",refreshToken,{
    maxAge:7*24*60*60*1000,
    httpOnly:true,
    //sameSide:'none',
  date:new Date(),
  });
  
}
export const createForgetPasswordCookie=(res:any, forgetPasswordToken:string)=>{
  res.cookie('forgetPassword',forgetPasswordToken,{
    maxAge:15*60*1000,
    httpOnly:true,
   // secure:true,
    sameSide:'none',
    date:new Date(),
  });
}
