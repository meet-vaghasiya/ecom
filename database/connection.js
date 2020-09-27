const mongoose=require('mongoose')
// require('dotenv').config()

const {DB_URL}=process.env
// console.log(process.env)
// console.log(DB_URL)
async function creatingConnection(){
    console.log("create connection")
    const connection=await mongoose.connect(DB_URL,{
        useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex: true
        })
        if (connection){
            // console.log("connected")
        }

}
module.exports=creatingConnection 