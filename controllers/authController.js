const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const auth = require("../utils/auth");
const AuthError = require("../exceptions/authError");
const { hashPassword, comparePassword } = require("../utils/password");

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
    return next(new AuthError(e.message, 500));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      return next(new AuthError("User not found", 404));
    }

    const isPswValid = await comparePassword(password, user.password);

    if (!isPswValid) {
      return next(new AuthError("Wrong password", 401));
    }

    const token = auth.generateToken(user);

    res.status(200).json({
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (e) {
    return next(new AuthError(e.message, 500));
  }
};

module.exports = {
  register,
  login,
};
