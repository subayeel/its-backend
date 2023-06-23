const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  roles: {
    Developer: {
      type: Number,
      default: 2023,
    },
    Manager: Number,
  },
  fullName: String,
  email: String,
  userRoleId: String,
  projectsAssigned: { type: Array, default: [] },
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
