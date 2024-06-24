const path = require("path");
const fs = require("fs");

const deletePostImage = (fileName) => {
  let filePath = path.join(__dirname, "../public/img/posts", fileName);
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`File ${filePath} was deleted successfully.`);
    } catch (err) {
      console.error(`Error deleting file ${filePath}:`, err);
    }
  } else {
    filePath = path.join(__dirname, "../public/img/users", fileName);
    fs.unlinkSync(filePath);
  }
};

module.exports = deletePostImage;
