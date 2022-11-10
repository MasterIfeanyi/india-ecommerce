const mongoose = require("mongoose");
const schema = mongoose.Schema;

const orderSchema = schema({
    pid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
})


module.exports = mongoose.model("orders", orderSchema)
