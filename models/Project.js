const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
  description: String,
  tickets: { type: Array, default: [] },
  employees: { type: Array, default: [] },
});

module.exports = mongoose.model("Project", projectSchema);
