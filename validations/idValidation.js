const idValidation = {
  id: {
    in: ["params"],
    isInt: {
      errorMessage: "ID deve essere numero intero",
    },
  },
};

module.exports = {
  idValidation,
};
