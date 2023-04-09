const Joi = require("joi");



const id = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const name = Joi.string();
const description = Joi.string();
const price = Joi.number().integer();
const category = Joi.string();
const image = Joi.string().uri();
const url = Joi.string().uri();


const createProductSchema = Joi.object({
	name: name.required(),
	description: description.required(),
	price: price.required(),
	category: id,
	image: image.required(),
	url: url.required()
})

const updateProductSchema = Joi.object({
	name: name,
	description: description,
	price: price,
	category: id,
	image: image,
	url: url
})

const getProductSchema = Joi.object({
	id: id.required(),
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
