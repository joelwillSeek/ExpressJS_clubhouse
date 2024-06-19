import mongoose,{Schema} from "mongoose";

const messageSchema = new Schema({
  timeStamp: String,
  description: String,
  author: { type: Schema.Types.ObjectId, ref: "Users" },
});

export default mongoose.model("Messages", messageSchema);
