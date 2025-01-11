"use strict";
const bcrypt = require("bcrypt");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const AppError = require("../../utils/appError");

const user = sequelize.define(
  "user",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Username is required.",
        },
        notEmpty: {
          msg: "Username is required.",
        }
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Invalid email.",
        },
        notNull: {
          msg: "Email is required.",
        },
        notEmpty: {
          msg: "Email is required.",
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required.",
        },
        notEmpty: {
          msg: "Password is required.",
        }
      },
      set(value) {
        if(value.length < 8){
          throw new AppError("Password must be at least 8 characters long.", 400);
        }
        this.setDataValue("password", bcrypt.hashSync(value, 10));
      }
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
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
    modelName: "user",
  }
);

module.exports = user;
