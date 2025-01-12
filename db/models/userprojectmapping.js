const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const UserProjectMapping = sequelize.define(
  "userProjectMapping",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
      validate: {
        notNull: {
          msg: "User ID is required.",
        },
        notEmpty: {
          msg: "User ID is required.",
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
          msg: "Project ID is required.",
        },
        notEmpty: {
          msg: "Project ID is required.",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("0", "1", "2"),
      allowNull: false,
      defaultValue: "0",
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
    modelName: "userProjectMapping",
  }
);

module.exports = UserProjectMapping;
