'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('tasks', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: Sequelize.STRING, allowNull: false, unique: true },
      status: { type: Sequelize.ENUM('pending', 'completed'), defaultValue: 'pending' },
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};
