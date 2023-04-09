const express = require("express")
const router = express.Router()

const CategoryService = require("../services/category.service")
const validatorHandler = require("../middleware/validate.handler")

const { getCategorySchema,
  createCategorySchema,
  updateCategorySchema } = require("../schema/category.schema")


const service = new CategoryService()

router.get("/", async (req, res, next) => {
  try {
  	const categories = await service.find();
  	res.status(200).json(categories)
  }
  catch (err) {
  	next(err)
  }
})

router.post(
  "/",
  validatorHandler(createCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      console.log(body)
      const category = await service.create(body);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const category = await service.update(id, body);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getCategorySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.delete(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router