const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
const postRouter = require("./routers/postRouter");
const categoryRouter = require("./routers/categoryRouter");
const tagRouter = require("./routers/tagRouter");
const authRouter = require("./routers/authRouter");

require("dotenv").config();
const { PORT } = process.env;
const port = PORT || 3000;

app.use(cors("*"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Home Page");
});
app.use("/posts", postRouter);
app.use("/categories", categoryRouter);
app.use("/tags", tagRouter);
app.use("/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
