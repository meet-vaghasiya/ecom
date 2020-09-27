
const jwt = require('jsonwebtoken')
const {JWT_KEY}=process.env
async function userAuthMiddleware(req, res, next) {
    try {
        console.log(req.body)
        const bearearToken = req.headers.authorization
        let token = null
        token = bearearToken.split(" ")[1]
        const payload = jwt.verify(token, JWT_KEY)
        req.session = {
            user: payload

        }
        next()
    }
    catch (err) {
        console.log(err)
        res.status(401)
        return res.json({ err: "invalid token gentated" })
    }
}
async function adminAuthMiddleware(req, res, next) {
    // console.log("admin auth working")
    try {
        // console.log(req.body)
        // console.log(req.headers)
        const bearearToken = req.headers.authorization
        // console.log(bearearToken)
        let token = null
        token = bearearToken.split(" ")[1]
        // console.log(token)
        // console.log(JWT_KEY)
        const payload = jwt.verify(token,JWT_KEY)
        // console.log(payload)
        req.session = {
            user: payload
        }
        if (payload.isAdmin){
          return  next()
    }
    res.status(401)
    return res.json({ err: "You are not authorise to modify" })
}
    catch (err) {
    // console.log(err)
    res.status(401)
    return res.json({ err: "invalid token gentated" })
}
    }
module.exports = { userAuthMiddleware, adminAuthMiddleware }