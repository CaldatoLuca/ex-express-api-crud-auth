const CustomError = require("../exceptions/customError");
const ValidationError = require("../exceptions/validationError");
const AuthError = require("../exceptions/authError");
const deletePostImage = require("../utils/deletePostImage");

module.exports = (err, req, res, next) => {
  // controllo se è un mio errore custom
  if (
    err instanceof CustomError ||
    err instanceof ValidationError ||
    err instanceof AuthError
  ) {
    if (req.file && err instanceof ValidationError) {
      deletePostImage(req.file.filename);
    }

    res.status(err.statusCode).json({
      status: err.name,
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    // se non è lanciato da me è un default 500
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: err.message,
    });
  }
};
