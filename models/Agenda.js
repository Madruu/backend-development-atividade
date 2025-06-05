import mongoose from "mongoose";
const AgendaSchema = new mongoose.Schema({
  name: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sharedWith: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    }
  ],
  isTeamAgenda: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

class AgendaClass {
  static async createAgenda(data) {
    return this.create(data);
  }
}

AgendaSchema.loadClass(AgendaClass);
module.exports = mongoose.model("Agenda", AgendaSchema);
