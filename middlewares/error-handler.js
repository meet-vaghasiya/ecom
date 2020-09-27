// process.on("uncaughtException",(err)=>{
//     console.log("uncaughtException")
// })
// process.on("unhandleRejection",(err)=>{
//     console.log("unhandleRejection")
// })


// function handleErrors(error,req,res,next){
//     // if(res.statusCode===200)
//     // res.status(500)
//     // res.json({error:error.message,info:"msg frome rror handler"})

// try{
//     if(res.stausCode===200)
// res.status(500)
//     res.json({error:error.message|| "something went wrong"})
// }
// catch(error){
//     next()
// }
// }
// module.exports=handleErrors