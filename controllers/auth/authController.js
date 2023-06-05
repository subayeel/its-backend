const User = require("../../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  const foundUser = await User.findOne({ username: user }).exec();

  if (!foundUser) return res.sendStatus(401); //unauthorized

  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    
    //create jwt
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          
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
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
