
const express= require('express')
const handleErrors = require('./middlewares/error-handler')
require('express-async-errors')
require('dotenv').config()
require('./database/connection')()
// console.log(process.env)

const app=express()

Promise.reject(new Error("from promise"))
.then(r=>{}, err=>console.log("Error from promise"))

const morgan=require('morgan')
const {categoryRouter,userRouter,orderRouter,productRouter}=require('./router/routers')
const { UPLOAD_FOLDER } = process.env

app.use(express.json())
app.use(morgan('dev'))




app.get('/',(req,res)=>{
    res.json({'name':"listning on app rout directly"})
})
const ApiRouter=express.Router()
ApiRouter.get('',(req,res)=>{
    res.json({message:'api router is working'})
})

app.use('/api',ApiRouter)


ApiRouter.use('/users',userRouter)
ApiRouter.use('/products',productRouter)
ApiRouter.use('/orders',orderRouter)
ApiRouter.use('/category',categoryRouter)

ApiRouter.get('/'+UPLOAD_FOLDER+"/*",(req,res,next)=>{
    const path=req.url
    console.log(__dirname)
    const filePath=`${__dirname}${path}`
    // console.log(filePath)
    res.sendFile(filePath)

    res.sendFile(filePath,(err)=>{
        next()
    })
})



// const passwordHash=require("password-hash")
// console.log("inside indexjs")

// const hashPassword=passwordHash.generate("passward123")
// console.log({hashPassword})
// const isvalid=passwordHash.verify("pasrd123",hashPassword)
// console.log(isvalid)




const {users}=require('./fakeData')
const { User } = require('./models/user')
const passwordHash=require('password-hash')

let newUsers=users.map(user=>{
    user.password=passwordHash.generate('123456')
    return user
})
// User.create(newUsers)
// .then(r=>{
//     console.log()
// })

// app.use(handleErrors)

module.exports={app}