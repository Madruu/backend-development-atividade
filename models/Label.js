import mongoose from "mongoose";
const LabelSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  name: String
})

class LabelClass {
  static async createLabel(data) {
    return this.create(data);
  }
}

LabelSchema.loadClass(LabelClass);
module.exports = mongoose.model("Label", LabelSchema);
