const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  title: { type: String, required: true },
  timeStamp: Date,
  description: String,
  author: { type: Schema.Types.ObjectId, ref: "Users" },
});

module.exports = mongoose.model("Messages", messageSchema);
