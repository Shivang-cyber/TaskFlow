const catchAsync = require("../utils/catchAsync");
const project = require("../db/models/project");

const createProject = catchAsync(async (req, res) => {
  const body = req.body;

  const Project = await project.create({
    title: body.title,
    shortDescription: body.shortDescription,
    description: body.description,
    category: body.category,
    tags: body.tags,
    createdBy: body.userId,
    productImage: body.productImage,
  });
  return res.status(201).json({ status: "success", message: Project });
});

const updateProject = catchAsync(async (req, res) => {
  const body = req.body;
  const projectId = req.params.projectId;

  const exisitingProject = await project.findOne({ where: { id: projectId } });

  const Project = await project.update(
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

  return res.status(200).json({ status: "success", message: "Project Updated Successfully" });
});

const deleteProject = catchAsync(async (req, res) => {
  const projectId = req.params.projectId;

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

module.exports = {
  createProject,
  updateProject,
  deleteProject,
};
