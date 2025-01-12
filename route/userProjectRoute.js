const router = require('express').Router();
const { acceptedProjectInvitation, addUserToProject, removeUserFromProject } = require('../controller/userProjectController');
const { authentication } = require("../controller/authController");

/**
 * @swagger
 * /api/v1/userProject/accept-invitation:
 *   post:
 *     summary: Accept an invitation to a project
 *     description: User accepts an invitation to join a project.
 *     tags:
 *       - UserProjectMapping
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: userProjectId
 *         in: query
 *         required: true
 *         description: ID of the user project mapping
 *     responses:
 *       200:
 *         description: Invitation accepted successfully
 *       400:
 *         description: Missing userProjectId
 *       403:
 *         description: Unauthorized to accept the invitation
 *       404:
 *         description: User or project not found
 */

router.route('/accept-invitation').post(authentication, acceptedProjectInvitation);

/**
 * @swagger
 * /api/v1/userProject/add-user:
 *   post:
 *     summary: Add a user to a project
 *     description: Add a user to a project by providing their user ID and project ID.
 *     tags:
 *       - UserProjectMapping
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User and project details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               description: ID of the user
 *             projectId:
 *               type: string
 *               description: ID of the project
 *     responses:
 *       201:
 *         description: User added successfully
 *       400:
 *         description: User or project already exists
 *       404:
 *         description: User or project not found
 *       403:
 *         description: Unauthorized to add user
 */

router.route('/add-user').post(authentication, addUserToProject);

/**
 * @swagger
 * /api/v1/userProject/remove-user:
 *   delete:
 *     summary: Remove a user from a project
 *     description: Remove a user from a project.
 *     tags:
 *       - UserProjectMapping
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User and project details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               description: ID of the user
 *             projectId:
 *               type: string
 *               description: ID of the project
 *     responses:
 *       200:
 *         description: User removed successfully
 *       404:
 *         description: User or project not found
 *       403:
 *         description: Unauthorized to remove user
 */

router.route('/remove-user').delete(authentication, removeUserFromProject);

module.exports = router;
