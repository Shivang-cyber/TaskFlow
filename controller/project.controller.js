const catchAsync = require("../utils/catchAsync");
const project = require("../db/models/project");
const AppError = require("../utils/appError");

const createProject = catchAsync(async (req, res, next) => {
  const body = req.body;

  const Project = await project.create({
    title: body.title,
    shortDescription: body.shortDescription,
    description: body.description,
    category: body.category,
    tags: body.tags,
    createdBy: req.user.dataValues.id,
    productImage: body.productImage,
  });
  return res.status(201).json({ status: "success", message: Project });
});

const updateProject = catchAsync(async (req, res, next) => {
  const body = req.body;
  const projectId = req.params.projectId;

  const exisitingProject = await project.findOne({ where: { id: projectId } });

  if (!exisitingProject) {
    return next(new AppError("Project not found", 404));
  }

  if (exisitingProject.createdBy !== req.user.dataValues.id) {
    return next(new AppError("You are not authorized to update this project", 403));
  }

  await project.update(
    {
      title: body.title || exisitingProject.title,
      shortDescription:
        body.shortDescription || exisitingProject.shortDescription,
      description: body.description || exisitingProject.description,
      category: body.category || exisitingProject.category,
      tags: body.tags || exisitingProject.tags,
      productImage: body.productImage || exisitingProject.productImage,
    },
    { where: { id: projectId } }
  );

  return res
    .status(200)
    .json({ status: "success", message: "Project Updated Successfully" });
});

const deleteProject = catchAsync(async (req, res, next) => {
  const projectId = req.params.projectId;

  const exisitingProject = await project.findOne({ where: { id: projectId } });

  if (!exisitingProject) {
    return next(new AppError("Project not found", 404));
  }

  if (exisitingProject.createdBy !== req.user.dataValues.id) {
    return next(new AppError("You are not authorized to delete this project", 403));
  }
  await project.update(
    {
      active: false,
    },
    { where: { id: projectId } }
  );

  return res
    .status(200)
    .json({ status: "success", message: "Project deleted successfully" });
});

const getProjectsByUserId = catchAsync(async (req, res, next) => {
  const userId = req.user.dataValues.id;

  const Projects = await project.findAll({ where: { createdBy: userId } });

  return res.status(200).json({ status: "success", message: Projects });
});

const getAllProjects = catchAsync(async (req, res, next) => {
  const Projects = await project.findAll();
  return res.status(200).json({ status: "success", message: Projects });
});

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getProjectsByUserId,
  getAllProjects,
};
