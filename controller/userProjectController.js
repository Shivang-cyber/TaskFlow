const catchAsync = require("../utils/catchAsync");
const userProject = require("../db/models/userprojectmapping");
const AppError = require("../utils/appError");
const project = require("../db/models/project");
const user = require("../db/models/user");
const { Op } = require("sequelize");

const {
  projectAssignedNotification,
  projectInvitationNotification,
  projectRemovedNotification,
} = require("../services/emaillFormats");

const acceptedProjectInvitation = catchAsync(async (req, res, next) => {
  const userProjectId = req.query.userProjectId;

  if (!userProjectId) {
    return next(new AppError("UserProjectId is required", 400));
  }

  const userProjectMapping = await userProject.findOne({
    where: { id: userProjectId },
  });

  if (!userProjectMapping) {
    return next(new AppError("User not found in project", 404));
  }

  if (userProjectMapping.userId !== req.user.dataValues.id) {
    return next(
      new AppError("You are not authorized to accept this invitation", 403)
    );
  }

  await userProject.update(
    { status: "1" },
    { where: { userId: userProjectMapping.dataValues.userId, projectId: userProjectMapping.dataValues.projectId } }
  );

  const newUser = await user.findOne({ where: { id: userProjectMapping.dataValues.userId } });
  const newProject = await project.findOne({ where: { id: userProjectMapping.dataValues.projectId } });

  projectAssignedNotification(newUser.username, newUser.email, newProject.name);

  return res
    .status(200)
    .json({ status: "success", message: "Invitation accepted" });
});

const addUserToProject = catchAsync(async (req, res, next) => {
  const body = req.body;

  const newProject = await project.findOne({ where: { id: body.projectId } });

  if (!newProject) {
    return next(new AppError("Project not found", 404));
  }

  const newUser = await user.findOne({ where: { id: body.userId } });

  if (!newUser) {
    return next(new AppError("User not found", 404));
  }

  if(newProject.createdBy !== req.user.dataValues.id) {
    return next(new AppError("You are not authorized to add user to this project", 403));
  }

  const existingUserProjectMapping = await userProject.findOne({
    where: { userId: body.userId, projectId: body.projectId },
  });


  if (existingUserProjectMapping) {
    if (existingUserProjectMapping.status === "1") {
      return next(new AppError("User already added to project", 400));
    } else if (existingUserProjectMapping.status === "0") {
      return next(new AppError("User already invited to project", 400));
    }
  }

    const userProjectMapping = await userProject.create({
      userId: body.userId,
      projectId: body.projectId,
    });

  const acceptLink = `${process.env.BACKEND_URL}/api/v1/userProject/accept-invitation?userProjectId=${userProjectMapping.id}`;

  projectInvitationNotification(
    newUser.dataValues.userName,
    newUser.dataValues.email,
    newProject.dataValues.title,
    acceptLink
  );

  return res
    .status(201)
    .json({ status: "success", message: userProjectMapping });
});

const removeUserFromProject = catchAsync(async (req, res, next) => {
  const body = req.body;

  const userProjectMapping = await userProject.findOne({
    where: {
      userId: body.userId,
      projectId: body.projectId,
      status: { [Op.in]: ["0", "1"] },
    },
  });

  if (!userProjectMapping) {
    return next(new AppError("User not found in project or is Inactive", 404));
  }

  const projectCreatedBy = await project.findOne({
    where: { id: body.projectId },
  });

  if (!projectCreatedBy) {
    return next(new AppError("Project not found", 404));
  }

  if (
    ![projectCreatedBy.createdBy, userProjectMapping.dataValues.userId].includes(
      req.user.dataValues.id
    )
  ) {
    return next(
      new AppError(
        "You are not authorized to remove user from this project",
        403
      )
    );
  }

  await userProject.update(
    { status: "2" },
    { where: { userId: body.userId, projectId: body.projectId } }
  );

  const newUser = await user.findOne({ where: { id: body.userId } });
  const newProject = await project.findOne({ where: { id: body.projectId } });

  projectRemovedNotification(newUser.username, newUser.email, newProject.dataValues.name);

  return res.status(200).json({ status: "success", message: "User removed" });
});

module.exports = {
  acceptedProjectInvitation,
  addUserToProject,
  removeUserFromProject,
};
