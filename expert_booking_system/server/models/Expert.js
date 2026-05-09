const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    experience: { type: Number, required: true },
    rating: { type: Number, required: true },
    bio: { type: String, required: true },
    availableSlots: [
      {
        date: { type: String, required: true }, // Format: YYYY-MM-DD
        slots: [{ type: String }], // e.g. "09:00 AM"
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expert", expertSchema);
