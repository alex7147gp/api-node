const express = require("express")



const router = express.Router()



router.get("/:categoriesId/products/productId", () => {
	const { categoriesId, productId } = req.params

	res.json({
	  categoriesId,
	  id,
      name: "Product 3",
      price: 4000
	})
})
module.exports = router