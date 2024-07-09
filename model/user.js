var mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,

  },
  country: {
    type: String,
    default: "india",
  },
  mobile_no: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("user_info", UserSchema);
module.exports = UserModel;
