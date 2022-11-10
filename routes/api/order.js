const express = require("express");

const router = express.Router();

const { getOrders, createOrder } = require('../../controllers/orderController')


router.get("/", getOrders)

router.post("/:productId", createOrder)



module.exports = router;