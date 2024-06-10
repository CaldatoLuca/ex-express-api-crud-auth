const AuthError = require("../exceptions/authError");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateJWT = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AuthError("You are not authenticated", 401);
  }

  const token = authorization.split(" ")[1];

  const errorMessages = {
    TokenExpiredError: "Il token è scaduto",
    JsonWebTokenError: "Token non valido",
  };

  jwt.verify(token, process.env.JWT_PASSWORD, (err, payload) => {
    if (err) {
      const errorMessage =
        errorMessages[err.name] || "Errore di autenticazione";
      throw new AuthError(errorMessage, 401);
    }

    req.user = payload;

    next();
  });
};

module.exports = authenticateJWT;
