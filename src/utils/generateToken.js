const jwt = require("jsonwebtoken");

module.exports = async (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME || "1d",
  });

  return token;
};
