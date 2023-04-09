const express = require("express");
const OrderService = require("../services/order.service");

const validatorHandler = require("../middleware/validate.handler");
const {
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
} = require("../schema/order.schema");

const router = express.Router();
const service = new OrderService();

router.post(
  "/",
  validatorHandler(createOrderSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const users = await service.create(body);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    const users = await service.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getOrderSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getOrderSchema, "params"),
  validatorHandler(updateOrderSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const servRes = await service.update(id, body);
      res.status(200).json(servRes);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getOrderSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const servRes = await service.delete(id);
      res.status(200).json(servRes);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
