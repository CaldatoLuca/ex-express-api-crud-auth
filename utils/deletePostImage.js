const path = require("path");
const fs = require("fs");

const deletePostImage = (fileName) => {
  const filePath = path.join(__dirname, "../public/img/posts", fileName);

  fs.unlinkSync(filePath);
};

module.exports = deletePostImage;
