const mongoose = require('mongoose')
                                                          

const Schema = mongoose.Schema

const orderSchema =new Schema({
    price: { type: Number, required: true },
    product: { type: mongoose.Types.ObjectId, ref: 'product', required: true },
    user: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    address: { type: String, required: true },
    quantity: { type: Number, required: true },
    paymemt_method: { type: String, required: true, default: "COD" },
    status: { type: Boolean, default: false }


},{
    timestamps: {
        createdAt: 'create_at',
        updatedAt: 'updated_at'

    }
})


const Order = mongoose.model('order', orderSchema)
module.exports = { Order }
