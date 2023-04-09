const ProductService = require("./../services/product.service")


const validatorHandler = require("./../middleware/validate.handler")
const { 
  createProductSchema, 
  updateProductSchema, 
  getProductSchema } = require("./../schema/product.schema")



const express = require("express")
const router = express.Router()



const service = new ProductService()

router.get("/", async (req, res, next) => {
	try {
      const products = await service.find(req.query)
      res.status(200).json(products)
  }
  catch (err) {
    next(err)
  }
  
})

router.get("/filter", (req, res) => {
	res.send("I am a filter")
})


router.get("/:id",	
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try{
      const { id } = req.params
      console.log("id: "+id)
      const product = await service.findOne(id)
      res.status(200).json(product)
    }
    catch (error) {
      next(error)
    }
  }  
)

router.post("/",
	validatorHandler(createProductSchema, "body"),
	async (req, res, next) => {
	  try {
      const body = req.body;
      const newProduct = await service.create(body)
      res.status(201).json(newProduct)
    }
    catch (err) {
      next(err) 
    }
  }
)

router.patch("/:id",
  validatorHandler(getProductSchema, "params"),	
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
	try {
      const { id } = req.params;
	    const body = req.body;
	    const products = await service.update(id, body);
      res.json(products);
	}
	catch (error) {
      next(error)
    }	
})

router.delete("/:id", async (req, res, next) => {
	try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  }
  catch (err) {
    next(err)
  }
})

module.exports = router;
