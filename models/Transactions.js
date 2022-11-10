const mongoose = require("mongoose");
const schema = mongoose.Schema;

const transactionSchema = schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Order"
    },
    statement: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("transactions", transactionSchema)
