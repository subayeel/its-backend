

const allowedOrigins = require("./allowedOrigins")
const corsOption = {
  origin: (origin, calllback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      calllback(null, true);
    } else {
      calllback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOption