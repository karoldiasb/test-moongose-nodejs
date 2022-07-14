const mongoose = require("mongoose");
const { Schema } = mongoose;

const movementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("movement", movementSchema);
