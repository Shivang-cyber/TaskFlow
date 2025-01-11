const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const project = sequelize.define(
  "project",
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
          msg: "Project title is required.",
        },
        notEmpty: {
          msg: "Project title is required.",
        },
      },
    },
    productImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shortDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: "Project short description is required.",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
          msg: "User ID is required.",
        },
        notEmpty: {
          msg: "User ID is required.",
        },
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
    modelName: "user",
  }
);

module.exports = project;
