const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const task = sequelize.define(
  "task",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Task title is required.",
        },
        notEmpty: {
          msg: "Task title is required.",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assignedTo: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
      validate: {
        notNull: {
          msg: "Task assignedTo is required.",
        },
        notEmpty: {
          msg: "Task assignedTo is required.",
        },
        set(value) {
          if (value === "") {
            this.setDataValue("assignedTo", this.createdBy);
          } else {
            this.setDataValue("assignedTo", value);
          }
        },
      },
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
      validate: {
        notNull: {
          msg: "Task createdBy is required.",
        },
        notEmpty: {
          msg: "Task createdBy is required.",
        },
      },
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "project",
        key: "id",
      },
      validate: {
        notNull: {
          msg: "Task projectId is required.",
        },
        notEmpty: {
          msg: "Task projectId is required.",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("0", "1", "2"),
      defaultValue: "0",
      allowNull: false,
      validate: {
        isIn: {
          args: [["0", "1", "2"]],
          msg: "Invalid status.",
        },
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    modelName: "task",
  }
);

module.exports = task;
