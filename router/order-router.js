
const express=require('express')

const orderRouter=express.Router()
const {getOrders,placeOrders,deleteOrder,updateOrder} =require('../controller/order-controller')
const { userAuthMiddleware, adminAuthMiddleware } = require('../middlewares/use-auth-middleware')


orderRouter.get('',adminAuthMiddleware,getOrders)
orderRouter.post('/',userAuthMiddleware,placeOrders)
orderRouter.delete('/:orderId',userAuthMiddleware,deleteOrder)
orderRouter.put('/:orderId',userAuthMiddleware,updateOrder)

module.exports={orderRouter}

