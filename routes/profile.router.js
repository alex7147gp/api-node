const express = require("express");
const passport = require("passport");

const jwt = require("jsonwebtoken");


const config = require("../config/config")

const OrderService = require("../services/order.service");
const router = express.Router();
const service = new OrderService();


router.post("/my-orders",
	passport.authenticate('jwt', { session: false}),
  async (req, res, next) => {
	try {
   const { user } = req.query;
   const orders = await service.findByUser(user.sub);
   res.json(orders)
	}
	catch (err) {
      next(err)
	}
});

module.exports = router;