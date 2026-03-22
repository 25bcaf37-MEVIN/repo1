import mongoose from "mongoose";
const TodoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  completed: { type: Boolean, default: false }
});
export default mongoose.model("Todo", TodoSchema);
