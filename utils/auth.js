const jwt = require("jsonwebtoken");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const generateToken = (user) =>
  jwt.sign({ id: user.id }, process.env.JWT_PASSWORD, { expiresIn: "1h" });

module.exports = {
  generateToken,
};
