const CategoryModel = require("../models/category.model")
const boom = require("@hapi/boom")

class CategorieService {


	async create(data) {
    const newCategory = new CategoryModel(data);
    console.log(data)
    try {
      return await newCategory.save();      
    }
    catch (err) {
    	throw boom.conflict('error of service '+err)
    }
	}

	async find() {
      return await CategoryModel.find()
	}

	async findOne(id) {
		  const category = await CategoryModel.findById(id).populate("product");
		  if(!category) {
		  	throw boom.notFound("category not found");
		  }
      return category
	}

	async update(id, changes) {
      const category = await CategoryModel.findByIdAndUpdate(id, changes, {
      	new: true,
      })
      if(!category) {
      	throw boom.notFound("category not found");
      }

      return category
	}

	async delete(id) {
      const category = await CategoryModel.findByIdAndDelete(id);
      if(!category) {
      	throw boom.notFound("category not found")
      }

      return category;
	}
}

module.exports = CategorieService;