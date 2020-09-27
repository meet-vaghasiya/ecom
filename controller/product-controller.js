const {Product}=require('../models/product')
const joi=require('joi')
const { valid } = require('joi')
// const {UPLOAD_FOLDER}=require('../const')
const {UPLOAD_FOLDER}=process.env



async function getProducts(req,res,next){
    // res.json({msg:'product working is workin'})
   
        const limit=Number.parseInt(req.query.pageSize)||2
const page=Number.parseInt(req.query.page)||1
const sort=req.query.sort
const skip= limit*(page-1)
    const products=await Product.find().sort(sort).skip(skip).limit(limit)
    const count=await Product.countDocuments()
    res.json({products,count})
    }
   
    

async function getProductByID(req,res){
    // res.json({msg:'product working is workin'})
    const _id=req.params.productId
   
    const product=await Product.find({_id})
    res.json({product})
    
}

function validationProduct(data) {
    
const productSchema=joi.object({
    name:joi.string().max(20).min(4).required(),
    price:joi.number().min(1).required(),
    discount:joi.number(),
category:joi.string().required(),
active:joi.boolean()
})
const result=productSchema.validate(data)
return result
// console.log(result)return result

}
async function createProduct(req,res,next){
    //creaye product code
// console.log(req.file)
const productImage=UPLOAD_FOLDER+"/"+req.file.filename

const validationResult=validationProduct(req.body)
if(validationResult.error){
    console.log("error is on the way")
    return next(new Error(validationResult.error.details[0].message))
 
}
let product = new Product({
...validationResult.value,
productImage}
    )

const result= await product.save()
res.json({product})
}

module.exports = {getProducts,createProduct,getProductByID}