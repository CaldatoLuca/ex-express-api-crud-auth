const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports = {
  hashPassword,
};
