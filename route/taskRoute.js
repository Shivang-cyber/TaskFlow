const router = require("express").Router();
const { authentication } = require("../controller/authController");
const {
  createTask,
  updateTask,
  getTaskByProjectId
} = require("../controller/taskController");

/**
 * @swagger
 * /api/v1/task:
 *   post:
 *     summary: Create a new task in a project
 *     description: Creates a new task for the specified project if the project exists and the user has permission to create tasks for it.
 *     tags:
 *       - Tasks
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Data to create a new task
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectId:
 *                 type: string
 *                 description: ID of the project to which the task belongs
 *               title:
 *                 type: string
 *                 description: Title of the task
 *               description:
 *                 type: string
 *                 description: Description of the task
 *               assignedTo:
 *                 type: string
 *                 description: User ID of the person assigned to the task. If not provided, the creator of the task will be assigned
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "0=Todo, 1=Pending, 2=Done"
 *                 message:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     assignedTo:
 *                       type: string
 *                     createdBy:
 *                       type: string
 *                     projectId:
 *                       type: string
 *       400:
 *         description: Bad Request, Invalid data
 *       404:
 *         description: Project not found
 *       403:
 *         description: Not authorized to create task for this project
 */

router.route("/").post(authentication, createTask);

/**
 * @swagger
 * /api/v1/task/{taskId}:
 *   put:
 *     summary: Update an existing task
 *     description: Updates an existing task based on the task ID. The user must be either the task creator or the assigned user.
 *     tags:
 *       - Tasks
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: taskId
 *         in: path
 *         description: ID of the task to be updated
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Data to update an existing task
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the task
 *               description:
 *                 type: string
 *                 description: Description of the task
 *               assignedTo:
 *                 type: string
 *                 description: User ID of the person assigned to the task (optional)
 *               status:
 *                 type: string
 *                 description: Status of the task only in 0,1,2
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Task Updated Successfully
 *       404:
 *         description: Task not found
 *       403:
 *         description: Not authorized to update this task
 */

router.route("/:taskId").put(authentication, updateTask);

/**
 * @swagger
 * /api/v1/task/{projectId}:
 *   get:
 *     summary: Get all tasks of a project
 *     description: Get all tasks of a project based on the project ID.
 *     tags:
 *       - Tasks
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         description: ID of the project to get tasks
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       assignedTo:
 *                         type: string
 *                       createdBy:
 *                         type: string
 *                       projectId:
 *                         type: string
 *       404:
 *         description: Project not found
 */

router.route("/:projectId").get(authentication, getTaskByProjectId);

module.exports = router;
