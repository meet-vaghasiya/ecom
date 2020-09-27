const { Category } = require('../models/category')
const joi =require('joi')
const { Product } = require('../models/product')

async function getCategory(req, res) {
    const category=await Category.find().select("_id name")
    res.json({ category })
}1   
async function categoryById(req, res) {
   const _id=req.params.categoryId
   const category=await Category.find({_id})
   res.send({category})
}
async function getProductsByCategory(req, res) {
//    res.send({msg:"categdf"})
   const products=await Product.find({category:req.params.categoryId})
   res.send({products})
 }

async function createCategory(req, res, next) {
    // res.json({ messsage: "create category" })
   const schema=joi.object({
       name:joi.string().min(3).max(20).required()
   })
const validateResult=schema.validate(req.body)
if(!validateResult.error){
    const name = validateResult.value.name
    const category = new Category({ name })

    const result= await category.save()
   return res.json(result)
}
const error=new Error(validateResult.error.details[0].message)
return next(error)

    

}


module.exports = { getCategory, createCategory,categoryById,getProductsByCategory } 