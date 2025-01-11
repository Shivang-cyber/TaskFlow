const catchAsync = require("../utils/catchAsync");
const task = require("../db/models/task");
const AppError = require("../utils/appError");
const project = require("../db/models/project");

const createTask = catchAsync(async (req, res, next) => {
  const body = req.body;

  const newProject = await project.findOne({ where: { id: body.projectId } });

  if (!newProject) {
    return next(new AppError("Project not found", 404));
  }

  if (newProject.createdBy !== req.user.dataValues.id) {
    return next(
      new AppError(
        "You are not authorized to create task for this project",
        403
      )
    );
  }

  const Task = await task.create({
    title: body.title,
    description: body.description,
    assignedTo: body.assignedTo || req.user.dataValues.id,
    createdBy: req.user.dataValues.id,
    projectId: body.projectId,
  });
  return res.status(201).json({ status: "success", message: Task });
});

const updateTask = catchAsync(async (req, res, next) => {
  const body = req.body;
  const taskId = req.params.taskId;

  const existingTask = await task.findOne({ where: { id: taskId } });

  if (!existingTask) {
    return next(new AppError("Task not found", 404));
  }

  if (
    ![existingTask.assignedTo,existingTask.createdBy].includes(req.user.dataValues.id)
  ) {
    return next(
      new AppError("You are not authorized to update this task", 403)
    );
  }

  await task.update(
    {
      title: body.title || existingTask.title,
      description: body.description || existingTask.description,
      assignedTo: body.assignedTo || existingTask.assignedTo,
      status: body.status || existingTask.status,
    },
    { where: { id: taskId } }
  );

  return res
    .status(200)
    .json({ status: "success", message: "Task Updated Successfully" });
});

module.exports = {
  createTask,
  updateTask,
};
