const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }
},{
  timestamps: true
})

const Task = new mongoose.model('Task', taskSchema);

module.exports = Task;