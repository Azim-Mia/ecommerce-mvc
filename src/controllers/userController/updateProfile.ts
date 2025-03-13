import {Request, Response, NextFunction } from 'express';
//import ProfileModel from '../profileSchema';
const updateProfile =(_req:Request, res:Response, _next:NextFunction)=>{
  res.send("updateProfile");
}
export default updateProfile;