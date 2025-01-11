"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("project", "description", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("project", "title", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("project", "description", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("project", "title", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    });
  },
};
