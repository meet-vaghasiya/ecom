const express=require('express')
const {getCategory,createCategory,categoryById,getProductsByCategory}= require('../controller/category-controller')

const categoryRouter=express.Router()
const {userAuthMiddleware, adminAuthMiddleware}=require('../middlewares/use-auth-middleware')


categoryRouter.get('',getCategory)
categoryRouter.get('/:categoryId',categoryById)
categoryRouter.get('/:categoryId/products',getProductsByCategory)


categoryRouter.post('/',adminAuthMiddleware ,createCategory)

module.exports={categoryRouter}