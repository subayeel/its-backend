const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  title: String,
  priority: String,
  reporter: String,
  description: String,
  status: String,
  assignee: { type: Array, default: [] },
  projectId: String,
  issueType: String,
});

module.exports = mongoose.model("Ticket", ticketSchema);
