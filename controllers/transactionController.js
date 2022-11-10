const User = require("../models/User");
const Order = require("../models/Order");


// get all transaction history for accounts attached to a user
const getAllTransactionHistory = async (req, res) => {
    try {
        const result = await Order.find({ user: req.id });
        if (!result) return res.status(200).json({ "message": "No such user found" });
        res.status(200).json({result});
    } catch (err) {
        return res.status(500).json({ "msg": err.message });
    }
}


// get account transaction history
const getATransactionHistory = async (req, res) => {
    if (!req?.params) return res.status(400).json({ "message": "parameters are required" });
    const {userId} = req.params
    try {
        // find all the orders
        const order = await Order.find({ user: req.id });
        console.log(order);
        if (!order) return res.status(400).json({ "message": "Order not found" });

        // find user that made request
        const user = await User.findById(req.id);
        if (!user) return res.status(400).json({ "message": "User not found" }); // check for user

        // make sure the logged in user matches the order(s)
        if (order[0].user?.toString() !== user.id) return res.status(401).json({ "message": "User not authorized" });

        // find the user transaction history to send to the front-end
        const result = await Order.find({user: req.id});
        if (!result) return res.status(200).json({ "message": "No results found" });
        res.status(200).json({ result });
    } catch (err) {
        return res.status(500).json({ "msg": err.message });
    }
}

module.exports = {
    getAllTransactionHistory,
    getATransactionHistory
}