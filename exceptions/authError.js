class AuthError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = "Auth Error";
  }
}

module.exports = AuthError;
