const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: String,
  password: {
    type: String,
    required: true,
  },
  membership: Boolean,
  isAdmin: Boolean,
});

module.exports = mongoose.model("Users", userSchema);
