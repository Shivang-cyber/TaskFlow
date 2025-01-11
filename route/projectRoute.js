const router = require("express").Router();
const { authentication } = require("../controller/authController");
const {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProjectsByUserId,
} = require("../controller/project.controller");

router
  .route("/")
  .get(authentication, getProjectsByUserId)
  .post(authentication, createProject);

router
  .route("/:projectId")
  .put(authentication, updateProject)
  .delete(authentication, deleteProject);

router.route("/all").get(getAllProjects);

module.exports = router;
