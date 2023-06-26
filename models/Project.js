const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
  description: String,
  managerId: String,
  tickets: { type: Array, default: [] },
  employees: { type: Array, default: [{ userId: String, fullName: String }] },
});

module.exports = mongoose.model("Project", projectSchema);
