const Developer = require("../../models/Developer");
const User = require("../../models/User");
const Project = require("../../models/Project");
const jwtDecode = require("jwt-decode");

async function getDevelopers(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwtDecode(token);

  // res.send("sss");
  const dev = await Developer.find({ managerId: decoded.UserInfo.userId });
  res.json(dev);
}

async function getAssignedProjects(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwtDecode(token);

  const proj = await Project.find({
    employees: { $elemMatch: { userId: decoded.UserInfo.userId } },
  });
  return res.json(proj);
}

async function deleteDevelopers(req, res) {
  const devId = req.params.id;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwtDecode(token);

  // res.send("sss");
  const dev = await Developer.deleteOne({ _id: devId });
  const user = await User.deleteOne({ userRoleId: devId });
  res.json(dev);
}

module.exports = { getDevelopers, deleteDevelopers, getAssignedProjects };
