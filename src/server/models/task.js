const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    required: true
  },
  datetime: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("Task", taskSchema);
