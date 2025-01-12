'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let projects = [{
      id: 'b6e9f7b4-7d1e-4d7c-8c6e-8d0f4c7d6b4e',
      title: 'Project A',
      shortDescription: 'Short description of project A',
      active: "1",
      category: ["category1", "category2"],
      tags: ["tag1", "tag2"],
      description: 'Description of project A',
      createdBy: 'b6e9f7b4-7d1e-4d7c-8c6e-8d0f4c7d6b4e',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 'b6e9f7b4-7d1e-4d7c-8c6e-8d0f4c7d6b4f',
      title: 'Project B',
      shortDescription: 'Short description of project B',
      active: "1",
      category: ["category2", "category3"],
      tags: ["tag2", "tag3"],
      description: 'Description of project B',
      createdBy: 'b6e9f7b4-7d1e-4d7c-8c6e-8d0f4c7d6b4f',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: '095a5f9a-8caf-45a3-bc45-8ec0b12b87af',
      title: 'Project C',
      shortDescription: 'Short description of project C',
      active: "1",
      category: ["category3", "category4"],
      tags: ["tag3", "tag4"],
      description: 'Description of project C',
      createdBy: '095a5f9a-8caf-45a3-bc45-8ec0b12b87af',
      createdAt: new Date(),
      updatedAt: new Date(),
    }];

    await queryInterface.bulkInsert('project', projects);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('project', null, {});
  }
};
