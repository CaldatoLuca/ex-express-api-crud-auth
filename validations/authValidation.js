const ValidationError = require("../exceptions/validationError");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const register = {
  email: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Email must not be empty",
      bail: true,
    },
    isEmail: {
      errorMessage: "Email must be a valid email address",
      bail: true,
    },
    custom: {
      options: async (value) => {
        const user = await prisma.user.findUnique({
          where: { email: value },
        });

        if (user) {
          throw new ValidationError(`Email already in use`, 400);
        }

        return true;
      },
    },
  },
  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Password must not be empty",
      bail: true,
    },
    isString: {
      errorMessage: "Password must be a string",
      bail: true,
    },
    isLength: {
      errorMessage: "Password must be at least 8 characters long",
      options: { min: 8 },
      bail: true,
    },
    matches: {
      errorMessage:
        "Password must contain at least one uppercase letter, one lowercase letter and one number",
      options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/,
      bail: true,
    },
  },
  image: {
    in: ["file"],
    notEmpty: {
      errorMessage: "Image must not be empty",
      bail: true,
    },
    isString: {
      errorMessage: "Image must be a string",
      bail: true,
    },
  },
  name: {
    in: ["body"],
    isString: {
      errorMessage: "Name must be a string",
      bail: true,
    },
    isLength: {
      errorMessage: "Name must be at least 3 characters long",
      options: { min: 3 },
      bail: true,
    },
    matches: {
      errorMessage: "Name must contain only letters and spaces",
      options: /^[a-zA-Z\s]+$/,
      bail: true,
    },
  },
};

const login = {
  email: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Email must not be empty",
      bail: true,
    },
    isEmail: {
      errorMessage: "Email must be a valid email address",
      bail: true,
    },
  },
  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Password must not be empty",
      bail: true,
    },
    isString: {
      errorMessage: "Password must be a string",
      bail: true,
    },
    isLength: {
      errorMessage: "Password must be at least 8 characters long",
      options: { min: 8 },
      bail: true,
    },
    matches: {
      errorMessage:
        "Password must contain at least one uppercase letter, one lowercase letter and one number",
      options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/,
      bail: true,
    },
  },
};

module.exports = {
  register,
  login,
};
