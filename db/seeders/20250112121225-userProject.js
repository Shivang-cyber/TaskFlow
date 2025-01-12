'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let userProjects = [{
      id: 'b6e9f7b4-7d1e-4d7c-8c6e-8d0f4c7d6b4e',
      userId: 'b6e9f7b4-7d1e-4d7c-8c6e-8d0f4c7d6b4e',
      projectId: 'b6e9f7b4-7d1e-4d7c-8c6e-8d0f4c7d6b4e',
      status: '0',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 'b6e9f7b4-7d1e-4d7c-8c6e-8d0f4c7d6b4f',
      userId: 'b6e9f7b4-7d1e-4d7c-8c6e-8d0f4c7d6b4f',
      projectId: 'b6e9f7b4-7d1e-4d7c-8c6e-8d0f4c7d6b4f',
      status: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: '095a5f9a-8caf-45a3-bc45-8ec0b12b87af',
      userId: '095a5f9a-8caf-45a3-bc45-8ec0b12b87af',
      projectId: '095a5f9a-8caf-45a3-bc45-8ec0b12b87af',
      status: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
    }];

    await queryInterface.bulkInsert('userProjectMapping', userProjects);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('userProjectMapping', null, {});
  }
};
