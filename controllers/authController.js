const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const auth = require("../utils/auth");

const register = async (req, res) => {
  const { email, password, name } = req.body;

  const data = {
    email,
    password,
    name,
  };

  try {
    const user = await prisma.user.create({ data });
    const token = auth.generateToken(user);

    res.status(200).json({
      user,
      token,
    });
  } catch (e) {}
};

module.exports = {
  register,
};
