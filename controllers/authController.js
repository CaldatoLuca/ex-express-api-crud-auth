const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const auth = require("../utils/auth");
const CustomError = require("../exceptions/customError");
const { hashPassword } = require("../utils/hashPassword");

const register = async (req, res, next) => {
  const { email, password, name } = req.body;

  const data = {
    email,
    password: await hashPassword(password),
    name,
  };

  try {
    const user = await prisma.user.create({ data });
    const token = auth.generateToken(user);

    res.status(200).json({
      message: "User created successfully",
      user,
      token,
    });
  } catch (e) {
    return next(new CustomError(e.message, 500));
  }
};

module.exports = {
  register,
};
