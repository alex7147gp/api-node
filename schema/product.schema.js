const Joi = require("joi");



const id = Joi.string().uuid();
const name = Joi.string();
const describe = Joi.string();
const price = Joi.number().integer().min(10);
const categorie = Joi.string();
const image = Joi.string();

const createProductSchema = Joi.object({
	name: name.required(),
	describe: describe.required(),
	price: price.required(),
	categorie: categorie.required(),
	image: image.required(),
})

const updateProductSchema = Joi.object({
	name: name,
	describe: describe,
	price: price,
	categorie: categorie,
	image: image,
})

const getProductSchema = Joi.object({
	id: id.required(),
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
