const bcrypt = require('bcrypt');

module.exports = {
    up: async (queryInterface, Sequelize) => {

        let password = 'password';
        const hashPassword = bcrypt.hashSync(password, 10);

        const users = [{   
                id: 'b6e9f7b4-7d1e-4d7c-8c6e-8d0f4c7d6b4e',
                userName: 'A',
                email: "a@a.com",
                password: hashPassword,
                isVerified: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },{
                id: 'b6e9f7b4-7d1e-4d7c-8c6e-8d0f4c7d6b4f',
                userName: 'B',
                email: "b@b.com",
                password: hashPassword,
                isVerified: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },{
                id: '095a5f9a-8caf-45a3-bc45-8ec0b12b87af',
                userName: 'C',
                email: "c@c.com",
                password: hashPassword,
                isVerified: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            }]

           await queryInterface.bulkInsert('user', users); 
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('user', null, {});
    },
};