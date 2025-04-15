//const mongoose=require('mongoose');
//const createError= require('http-errors');
const searchService=async(model,req)=>{
  try{
const text=req.query.search || "";
   const page=Number(req.query.page) || 1;
   const limit=Number(req.query.limit) || 5;
    const searchRegExp=new RegExp('.*' + text + '.*', 'i');
    const filter={
      isAdmin:{$ne:true},
     $or:[
  {name:{$regex:searchRegExp}},
  {slug:{$regex:searchRegExp}},
  {email:{$regex:searchRegExp}},
        ],
    };
  const options= {password:0, _id:0};
  const exists=await model.find(filter,options)
  .limit(limit)
  .skip((page-1) * limit);
  if(!exists) throw createError(404,"not found users");
  const count= await model.find(filter).countDocuments();
 return {
 payload:exists,
 pagination:{
    totalPage:Math.ceil(count/limit),
    correntPage:page,
    previousePage:page-1>0 ? page-1:null,
    nextPage:page+1 < Math.ceil(count/limit) ? page + 1:null,
  totalCount:count
   },
 }
}catch(error){
  return error;
}
}
export default searchService;