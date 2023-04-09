const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  recoveryToken: {
    type: String,
  },
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;