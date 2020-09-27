const { object } = require('joi')
// const { valid } = require('joi')
const joi = require('joi')
const { Order } = require('../models/order')
// const { Order } = require('../models/order')
const { Product } = require("../models/product")

async function getOrders(req, res) {
    const orders = await Order.find()
        

    res.json({ orders })
}

async function getOrderByUsers(req, res) {

    const user = req.params.userId
    const order = await Order.find({ user })
    res.json({ order })

}
async function deleteOrder(req, res) {

    const _id = req.params.orderId
    const orders = await Order.deleteOne({ _id })
    res.json({ orders })
}

async function updateOrder(req, res,next) {
    const _id = req.params.orderId
    const body = req.body

// const result=await Order.findByIdAndUpdate({_id},{$set:body},{new:true})
// res.json({result})
        const schema = joi.object({
       
            product: joi.string(),
            user: joi.string(),
            address: joi.string(),
            quantity: joi.string().min(1),
            status: joi.boolean(),
            payment_method: joi.string()
       
    })
   
    const {value,error}=schema.validate(body)
if(error){
    next(new Error(error.details[0].message))
    return
}
if(value.product){
     value.price=( await Product.findById(value.product)).price
}    


const result=await Order.findOneAndUpdate({_id},{$set:value},{new:true})
res.json({result})


}
async function placeOrders(req, res, next) {
            const schema = joi.object({
                orders: joi.array().items({
                    product: joi.string().required(),
                    user: joi.string().required(),
                    address: joi.string().required(),
                    quantity: joi.string().min(1).required(),

                }).min(1).required()
            })
            const validationResult = schema.validate(req.body)
            if (validationResult.error) {
                return next(new Error(validationResult.error.details[0].message))
            }
            const { orders } = validationResult.value

            // orders.forEach(async (order)=>{
            //     // console.log(element)
            // let productId=order.product
            // let product=await Product.findOne({_id:productId}).price
            // order.price=price


            // })
            for (index in orders) {
                let order = orders[index]
                // console.log(order)
                let productId = order.product
                // console.log(productId)
                let price = (await Product.findOne({ _id: productId })).price
                // console.log(price)
                orders[index].price = price
                // res.json({order})

            }
            const saveResult = await Order.create(orders)
            res.send({ orders: saveResult })
            // const orders=await Order.create(validationResult.value.orders)

            // const saveResult =await Order.create(orders)
            // res.json({orders:saveResult})
        }
module.exports = { getOrders, placeOrders, getOrderByUsers, deleteOrder, updateOrder }