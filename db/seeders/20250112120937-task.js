'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let tasks = [{
      id: 'b6e9f7b4-7d1e-4d7c-8c6e-8d0f4c7d6b4e',
      title: 'Task A',
      description: 'Description of task A',
      createdBy: 'b6e9f7b4-7d1e-4d7c-8c6e-8d0f4c7d6b4e',
      assignedTo: 'b6e9f7b4-7d1e-4d7c-8c6e-8d0f4c7d6b4e',
      projectId: 'b6e9f7b4-7d1e-4d7c-8c6e-8d0f4c7d6b4e',
      status: '0',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 'b6e9f7b4-7d1e-4d7c-8c6e-8d0f4c7d6b4f',
      title: 'Task B',
      description: 'Description of task B',
      createdBy: 'b6e9f7b4-7d1e-4d7c-8c6e-8d0f4c7d6b4f',
      assignedTo: 'b6e9f7b4-7d1e-4d7c-8c6e-8d0f4c7d6b4f',
      projectId: 'b6e9f7b4-7d1e-4d7c-8c6e-8d0f4c7d6b4f',
      status: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: '095a5f9a-8caf-45a3-bc45-8ec0b12b87af',
      title: 'Task C',
      description: 'Description of task C',
      createdBy: '095a5f9a-8caf-45a3-bc45-8ec0b12b87af',
      assignedTo: '095a5f9a-8caf-45a3-bc45-8ec0b12b87af',
      projectId: '095a5f9a-8caf-45a3-bc45-8ec0b12b87af',
      status: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
    }];

    await queryInterface.bulkInsert('task', tasks);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('task', null, {});
  }
};
