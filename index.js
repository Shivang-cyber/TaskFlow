require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const authRoute = require("./route/authRoute");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const projectRoute = require("./route/projectRoute");
const taskRoute = require("./route/taskRoute");

app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/task", taskRoute);

app.use(
  "*",
  catchAsync(async (req, res, next) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  })
);

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
