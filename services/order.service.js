const OrderModel = require("../models/order.model");
const CustomerModel = require("../models/customer.model");
const boom = require("@hapi/boom");

class OrderService {
  async create(data) {
    const newOrder = new OrderModel(data);
    let order;
    try {
      order = await newOrder.save();
    } catch (error) {
      throw boom.conflict(error);
    }
    const customer = await CustomerModel.findById(order.customer);

    customer.orders = [...customer.orders, order._id];
    try {
      const updatedCustomer = await customer.save();
      return {
        order,
        updatedCustomer,
      };
    } catch (error) {
      throw boom.conflict(error);
    }
  }
  async find() {
    return await OrderModel.find();
  }
  async findOne(id) {
    const order = await OrderModel.findById(id)
      .populate("products")
      .populate("customer")
      .exec();
    if (!order) {
      throw boom.notFound("order not found");
    }
    return order;
  }
  async update(id, changes) {
    const order = await OrderModel.findByIdAndUpdate(id, changes, {
      new: true,
    });
    if (!order) {
      throw boom.notFound("order not found");
    }
    return order;
  }
  async delete(id) {
    const order = await OrderModel.findByIdAndDelete(id);
    if (!order) {
      throw boom.notFound("order not found");
    }
    try {
      const customer = await CustomerModel.findById(order.customer);
      customer.orders.filter(
        (item) => JSON.stringify(item) !== order._id
      );
    } catch (error) {
      throw boom.conflict(error);
    }

    return order;
  }
}

module.exports = OrderService;
