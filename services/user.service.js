const UserModel = require("../models/user.model");
const boom = require("@hapi/boom");

class UserService {
  async create(data) {
    const newUser = new UserModel(data);
    try {
      const dbRes = await newUser.save();
      return dbRes;
    } catch (error) {
      throw boom.conflict(error);
    }
  }

  async find() {
    return await UserModel.find();
  }

  async findOne(id) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw boom.notFound("user not found");
    }
    return user;
  }

  async findByEmail(email) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw boom.notFound("user not found");
    }
    return user;
  }

  async update(id, changes) {
    const user = await UserModel.findByIdAndUpdate(id, changes, { new: true });
    if (!user) {
      throw boom.notFound("user not found");
    }
    return user;
  }

  async delete(id) {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      throw boom.notFound("user not found");
    }
    return user;
  }
}

module.exports = UserService;