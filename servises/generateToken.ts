var jwt = require('jsonwebtoken');
export const generateAccessToken= async(payload:any, access_key:string, expiresIn:string)=>{
  const token =await jwt.sign(payload,access_key, {expiresIn:expiresIn});
  return token;
}
export const generateRefreshToken= async(payload:any, refresh_key:string, expiresIn:string)=>{
  const token = await jwt.sign(payload,refresh_key, {expiresIn:expiresIn});
  return token;
}