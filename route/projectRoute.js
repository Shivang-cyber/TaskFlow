const router = require('express').Router();
const { createProject, updateProject, deleteProject } = require('../controller/project.controller');

router.route("/createProject").post(createProject);
router.route("/updateProject/:projectId").put(updateProject);
router.route("/deleteProject/:projectId").delete(deleteProject);

module.exports = router;