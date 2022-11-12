const express = require("express");
const {getUsers, getAUser, updateUser, deleteUser, getUserOrders} = require("../../controllers/usersController")

router = express.Router();

router.route("/")
    .get(getUsers)

router.route("/order/:id")
    .get(getUserOrders)
    
router.route("/:id")
    .get(getAUser)
    .delete(deleteUser)
    .put(updateUser)

module.exports = router;