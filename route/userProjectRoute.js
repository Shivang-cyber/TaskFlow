const router = require('express').Router();
const { acceptedProjectInvitation, addUserToProject, removeUserFromProject } = require('../controller/userProjectController');
const { authentication } = require("../controller/authController");

router.route('/accept-invitation').post(authentication, acceptedProjectInvitation);

router.route('/add-user').post(authentication, addUserToProject);

router.route('/remove-user').delete(authentication, removeUserFromProject);

module.exports = router;