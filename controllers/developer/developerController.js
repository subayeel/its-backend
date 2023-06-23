const Developer = require("../../models/Developer");
const jwtDecode = require("jwt-decode");

async function getDevelopers(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwtDecode(token);

  // res.send("sss");
  const dev = await Developer.find({ managerId: decoded.UserInfo.userId });
  res.json(dev);
}

module.exports = { getDevelopers };
