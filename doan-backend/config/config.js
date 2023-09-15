const dotenv = require("dotenv");
const assert = require("assert");
dotenv.config();

const { PORT, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

assert(PORT, "PORT is require");
module.exports = {
  port: PORT,
  accessTokenSecret: ACCESS_TOKEN_SECRET,
  refreshTokenSecret: REFRESH_TOKEN_SECRET,
};
