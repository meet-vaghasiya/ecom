const { User } = require("../models/user")
const joi = require('joi')
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')
const { object } = require("joi")
const { token } = require("morgan")

async function getUsers(req, res, next) {
const limit=Number.parseInt(req.query.pageSize)||2
const page=Number.parseInt(req.query.page)||1
const sort=req.query.sort
const skip= limit*(page-1)


// console.log(limit)
const users=await User.find()
.sort(sort)
.skip(skip)
.limit(limit)

const count=await User.countDocuments()

    res.json({users,count})
    // res.json({})

}
function validateForRegistration(user) {
    const schema = joi.object({
        name: joi.string().min(3).max(20).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).max(15).required(),
        repassword: joi.string().min(6).max(15).required(),
        phone: joi.string().min(10).max(12)
    })
    const result = schema.validate(user)
    return result
}
async function saveUser(req, res, next) {
    const result = validateForRegistration(req.body)
       if (result.error) {
        //thor error
        res.status(400)

        return next(new Error(result.error.details[0].message))
    }
    const userData = result.value

    if (userData.password != userData.repassword) {
        //thorw error
        return next(new Error("password not match"))
    }

    // =======================================CHEKING FOR ALREADY EXIST USER===============================
    // let user = await User.findOne({ email: userData.email })
    const isExists = await User.isExists(userData.email)
    // console.log(isExists)

    userData.password = passwordHash.generate(userData.password)


    if (!isExists) {
        const user = await new User(userData).save()
        res.json(user)

    }
    else {
        return next(new Error("email already exist"))
    }

}


function validateLoginCredentials(body) {
    // console.log(validate)
    // console.log(body)
    const schema = joi.object({

        email: joi.string().email().required(),
        password: joi.string().min(6).max(15).required(),
    })

    const result = schema.validate(body)
    console.log(result)
    return result
}
async function loginUser(req, res, next) {

    // console.log(req.body)
    const result = validateLoginCredentials(req.body)
    if (result.error) {
        res.status(400)
        const error = new Error("Email or passord is invalid")
        return next(error)
    }
    const { email, password } = result.value
    console.log(email)
    // const email=result.email
    // const password=result.password

    const user = await User.findOne({ email })
    // console.log("user",user)
    if (user) {
        const isPasswordMatch = passwordHash.verify(password, user.password)
        if (isPasswordMatch) {
            const payload = {
                _id: user._id,
                isAdmin: user.isAdmin,
                email: user.email

            }

            const token = jwt.sign(payload, "2134")
            console.log(token)

            return res.json({ msg: "login sucessful", token })
        }
    }
    res.status(400)

//    return next(error = new Error(res.error.details[0].message))
const error = new Error("Email or passeord is invalid")
return next(error)
}

async function updateUser(req, res, next) {
    const loggedInUser = req.session.user
    console.log("loggIn user: ", loggedInUser)
    const schema = joi.object({
        phone: joi.string().min(10).max(20),
        name: joi.string().min(5).max(20)
    })
    const result = schema.validate(req.body)
    if (result.error) {
        return next(new Error(result.error.details[0].message))

    } else {
        // const user = await User.findOneAndUpdate({ _id: result._id },
        //     {
        //         $set: result.value
        //     })
        // res.json({ user })
        let user = await User.findById(loggedInUser._id)
        user = Object.assign(user, result.value)
        user = await user.save()
        res.json(user)


    }



    // res.json({})
    // console.log(req.body)
    // const bearearToken = req.headers.authorization
    // console.log(bearearToken)
    // let token = null
    // if (bearearToken) {
    //     token = bearearToken.split(" ")[1]

    //     try {
    //         const payload = jwt.verify(token,'2344')
    //         console.log(req.body)

    //         const schema=joi.object({
    //             phone:joi.string().min(10).max(20),
    //             name:joi.string().min(10).max(20)
    //         })
    //             const result=schema.validate(req.body)
    //             if(result.error){
    //                 return next(new Error(result.error.details[0].message))

    //             }else{
    //             const user=await    User.findOneAndUpdate({_id:payload},
    //                 {
    //                     $set:result.value
    //                 })
    //                 res.json({user})
    //             }


    //     }
    //     catch (error) {
    //         res.status(401)
    //         const err = new Error('pls login to update')
    //         console.log("pls login to update")
    //         return next(err)

    //     }
    // jwt.verify(token,'2344',(err,decoded)=>{
    //     if(err){
    //         console.log("ER",err)

    //     }
    //     if(decoded){
    //         console.log("___DATA___",decoded)
    //     }
    // })
    //     } else {
    //         res.status(401)
    //         const err = new Error('pls logwedein to update')
    //         return next(err)
    //     }
    //  res.json({})
}



async function updateUserById(req, res, next) {
    const user_id = req.params.user_id


        let user = await User.findById(user_id)
        user = Object.assign(user, req.body)
        user = await user.save()
        res.json(user)
    }


module.exports = { getUsers, saveUser, loginUser, updateUser, updateUserById }
