const express=require('express')
var multer  = require('multer')
const path=require('path')
path.join(__dirname,'../')
const mongoose=require('mongoose')
const {UPLOAD_FOLDER}=require('../const')
const tempMult=multer({dest:UPLOAD_FOLDER})
// console.log(tempMult)
// console.log(path.join(__dirname,'../'))
// const upload = multer({dest:"media/products"})
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const filePath=path.join(__dirname,'../')+tempMult
        // console.log(filePath)
      cb(null,filePath)
    },
    filename: function (req, file, cb) {
        fileName=mongoose.Types.ObjectId()+'.jpg'

      cb(null,fileName)
    }
  })
  const upload = multer({storage})
const productRouter=express.Router()

const {getProducts, createProduct,getProductByID}=require('../controller/product-controller')
const { adminAuthMiddleware } = require('../middlewares/use-auth-middleware')



productRouter.get('/',getProducts)
productRouter.get('/:productId',getProductByID)
productRouter.post('/',adminAuthMiddleware,upload.single('image'),createProduct)


module.exports={productRouter} 
 