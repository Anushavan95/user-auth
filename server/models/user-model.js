const mongoose = require("mongoose");

const { Schema } = mongoose;
const opts = {
  toJSON: {
    virtuals: true,
  },
};
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
  },
  opts
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
