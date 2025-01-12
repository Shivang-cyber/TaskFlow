const router = require("express").Router();
const { authentication } = require("../controller/authController");
const {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProjectsByUserId,
} = require("../controller/project.controller");

/**
 * @swagger
 * /api/v1/project:
 *   get:
 *     summary: Get all projects of a user
 *     description: Fetches all projects created by the authenticated user.
 *     tags:
 *       - Projects
 *     security:
 *       - BearerAuth: [] 
 *     responses:
 *       200:
 *         description: List of user’s projects
 *       403:
 *         description: Forbidden (User not authorized)
 */

router.route("/").get(authentication, getProjectsByUserId);

/**
 * @swagger
 * /api/v1/project/create:
 *   post:
 *     summary: Create a new project
 *     description: Creates a new project if the user has permission to create it.
 *     tags:
 *       - Projects
 *     security:
 *       - BearerAuth: [] 
 *     requestBody:
 *       description: Data to create a new project
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               productImage:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Invalid request data
 *       403:
 *         description: Forbidden (User not authorized)
 */
router.route("/create").post(authentication, createProject);


/**
 * @swagger
 * /api/v1/project/update/{projectId}:
 *   put:
 *     summary: Update an existing project
 *     description: Updates an existing project based on the project ID if the user has permission to update it.
 *     tags:
 *       - Projects
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - name: projectId
 *         in: path
 *         description: ID of the project to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Data to update an existing project
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               productImage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Invalid request data
 *       403:
 *         description: Forbidden (User not authorized)
 *       404:
 *         description: Project not found
 */

router.route("/update/:projectId").put(authentication, updateProject);


/**
 * @swagger
 * /api/v1/project/delete/{projectId}:
 *   delete:
 *     summary: Delete a project (soft delete)
 *     description: Deletes a project if the user has permission to delete it.
 *     tags:
 *       - Projects
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - name: projectId
 *         in: path
 *         description: ID of the project to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       403:
 *         description: Forbidden (User not authorized)
 *       404:
 *         description: Project not found
 */

router.route("/delete/:projectId").delete(authentication, deleteProject);

/**
 * @swagger
 * /api/v1/project/all:
 *   get:
 *     summary: Get all projects
 *     description: Fetches all projects.
 *     tags:
 *       - Projects
 *     responses:
 *       200:
 *         description: List of all projects
 */

router.route("/all").get(getAllProjects);

module.exports = router;
