const User = require("../../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Manager = require("../../models/Manager");
const Developer = require("../../models/Developer");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  const foundUser = await User.findOne({ username: user }).exec();
  const foundManager = await Manager.findOne({ username: user }).exec();
  const foundDeveloper = await Developer.findOne({ username: user }).exec();
  const userId = foundManager ? foundManager._id : foundDeveloper?._id;

  
  if (!foundUser )
    return res.sendStatus(401); //unauthorized

  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    //create jwt
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: foundUser.roles,
          userId: userId.toString(),
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: foundUser.roles,
          userId: userId.toString(),
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    //saving users with refresh token
    foundUser.refreshToken = refreshToken;

    const result = await foundUser.save();
    console.log(result);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    if (foundManager) {
      res.json({
        accessToken,
        roles: foundUser.roles,
        userId: userId.toString(),
      });
    } else {
      res.json({
        accessToken,
        roles: foundUser.roles,
        userId: userId.toString(),
      });
    }
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
