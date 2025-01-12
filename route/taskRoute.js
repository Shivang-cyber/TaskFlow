const router = require("express").Router();
const { authentication } = require("../controller/authController");
const {
  createTask,
  updateTask,
} = require("../controller/taskController");

router.route("/").post(authentication, createTask);

router.route("/:taskId").put(authentication, updateTask);

module.exports = router;
