const faker = require("@faker-js/faker")


class CategorieService {


   constructor() {
   	 this.categories = [];
     this.generate();
   }

	create(data) {
    const newCategories = {
    	id: faker.datatype.uuid(),
    	...data
    }
    this.categories.push(newCategories);
    return newCategories;
	}

	find() {
      return this.categories
	}

	findOne(id) {
      return this.categories.find(item => item.id === id)
	}

	update(id, changes) {
      const index = this.products.findIndex(item => item.id === id)
	    if (index === -1) {
	    	throw new Error("product not found")
	    }
	    const product = this.products[index];
	    this.products[index] = {
	    	...product,
	    	...changes
	    }
	    return this.products[index];
	}

	delete(id) {
      const index = this.products.findIndex(item => item.id === id)
      if (index === -1) {
	    	throw new Error("product not found")
	    }
	    this.products.splice(index, 1);
	    return { id };
	}
}

module.exports = CategorieService;