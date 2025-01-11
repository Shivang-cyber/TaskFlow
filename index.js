require("dotenv").config({path: `${process.cwd()}/.env`});
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const authRoute = require("./route/authRoute");

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/auth", authRoute);

app.use("*", (req, res) => {
    res.status(404).json({ status: false ,message: "Route not found" });
    });

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
