const express = require("express")
const UserService = require("../services/user.service");

const validatorHandler = require("../middleware/validate.handler")
const router = express.Router()

const { getUserSchema,
 createUserSchema, 
 updateUserSchema } = require("../schema/user.schema");

const service = new UserService;

router.get("/", 
	async (req, res, next) => {
      try {
      	const users = await service.find();
      	res.status(200).json(users);
      }
      catch (err) {
      	next(err)
      }	
})

router.post(
  "/",
  validatorHandler(createUserSchema, "body"),
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

router.get(
  "/:id",
  validatorHandler(getUserSchema, "params"),
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
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
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
  validatorHandler(getUserSchema, "params"),
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

module.exports = router