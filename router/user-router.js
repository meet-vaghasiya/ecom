const express=require('express')
const { getOrderByUsers } = require('../controller/order-controller')
const userRouter=express.Router()
const {getUsers,saveUser,loginUser, updateUser,updateUserById} =require('../controller/user-controller')
const {userAuthMiddleware,adminAuthMiddleware}=require('../middlewares/use-auth-middleware')


userRouter.get('/',getUsers)
userRouter.get('/:userId/orders',getOrderByUsers)


userRouter.post('',saveUser)
userRouter.post("/login",loginUser)
userRouter.put('/:user_id',adminAuthMiddleware,updateUserById)
userRouter.put('',userAuthMiddleware,updateUser)







module.exports={userRouter}