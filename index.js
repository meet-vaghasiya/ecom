const {app} =require('./server')
require('./logger/logger')



app.listen(process.env.PORT||3000,()=>{
    console.log("listening")
})
