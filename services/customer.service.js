const CustomerModel = require("../models/customer.model");
const UserModel = require("../models/user.model");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");


class CustomerService {
  async create(data) {
    const { user } = data;
    const hash = await bcrypt.hash(user.password, 10);
    const newUser = new UserModel({
      ...user, password: hash,
      role: "customer",
    });
    let userRes;
    try {
      userRes = await newUser.save();
      delete userRes._doc.password
    } catch (error) {
      throw boom.conflict(error);
    }
    const newCustomer = new CustomerModel({ ...data, user: userRes._id });
    try {
      const customer = await newCustomer.save();
      return {
        user: userRes,
        customer,
      };
    } catch (error) {
      throw boom.conflict(error);
    }
  }

  async find() {
    return await CustomerModel.find();
  }

  async findOne(id) {
    const customer = await CustomerModel.findById(id).populate(
      "user",
      "-password"
    );
    if (!customer) {
      throw boom.notFound("customer not found");
    }
    return customer;
  }

  async findByUserId(id) {
    const customer = await CustomerModel.findOne({ user: id }).populate("user");
    return customer;
  }

  async update(id, changes) {
    const customer = await CustomerModel.findByIdAndUpdate(id, changes, {
      new: true,
    });
    if (!customer) {
      throw boom.notFound("customer not found");
    }
    return customer;
  }

  async delete(id) {
    const customer = await CustomerModel.findByIdAndDelete(id);
    if (!customer) {
      throw boom.notFound("customer not found");
    }
    const user = await UserModel.findByIdAndDelete(customer.user);
    return { user, customer };
  }
}

module.exports = CustomerService;
