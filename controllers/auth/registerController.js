const Developer = require("../../models/Developer");
const Manager = require("../../models/Manager");

const bcrypt = require("bcrypt");
const User = require("../../models/User");

const jwtDecode = require("jwt-decode");

const handleNewDeveloper = async (req, res) => {
  const { user, pwd, roles, fullName } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwtDecode(token);
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //crete and store the new user
    const result = await Developer.create({
      username: user,
      fullName: fullName,
      password: hashedPwd,
      managerId: decoded.UserInfo.userId,
      roles: { Developer: 2023 },
    });
    await User.create({
      username: user,
      fullName: fullName,
      password: hashedPwd,
      roles: { Developer: 2023 },
    });
    const manager = await Manager.findOne({ _id: decoded.UserInfo.userId }).exec();
    manager.developers.push(result);
    manager.save();

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const handleNewManager = async (req, res) => {
  const { user, pwd, roles, fullName } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  // check for duplicate usernames in the db

  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //crete and store the new user
    const result = await Manager.create({
      username: user,
      fullName: fullName,
      password: hashedPwd,
      roles: { Manager: 2000 },
    });
    User.create({
      username: user,
      fullName: fullName,
      password: hashedPwd,
      roles: { Manager: 2000 },
    });

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewManager, handleNewDeveloper };
