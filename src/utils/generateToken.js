const jwt = require("jsonwebtoken");

module.exports = async (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME || "1d",
  });

  return token;
};
