const Order = require("../models/Order");
const Product = require("../models/Product");Product
const User = require("../models/User");

const getOrders = async (req, res) => {

    let {page, limit } = req.query;

    if (!page) page = 1;
    if (!limit) limit = 10;

    let skip = (page - 1) * 10;
    
    try {
        const result = await Order.find().skip(skip).limit(limit);
        if (!result) return res.status(200).json({ "message": "No results found" });
        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({"msg": `${error.message}`})
    }
}

//create an order
const createOrder = async (req, res) => {
    if (!req?.body) return res.sendStatus(400).json({ "message": "body is required" });
    const { name, price, quantity } = req.body;
    const {productId} = req.params
    try {

        // find the product
        const product = await Product.findById({ _id: productId });
        if (!product) return res.status(400).json({ "message": "Product not found" });

        // create order
        const order = await Order.create({
            name, price, quantity, user: req.id, pid: productId
        })

        // make sure the order matches the product id
        if (order.pid.toString() !== product.id) return res.status(401).json({ "message": "Not the same product" });

        
        // find the user orders to send to the front-end
        const result = await Order.find({ user: req.id });
        if (!result) return res.status(200).json({ "message": "No results found" });
        res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({ "msg": err.message });
    }
}

const getUserOrders = async (req, res) => {
    try{
        const result = await Order.find({ user: req.id });
        if (!result) return res.status(200).json({ "message": "No results found" });
        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({"msg": `${error.message}`})
    }
}

module.exports = { getOrders, createOrder, getUserOrders }