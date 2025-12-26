'use strict'

const { userType } = require('../src/@types/userType.cjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('users', userType)

		await queryInterface.addIndex('users', ['email'], {
			name: 'users_email_index',
			unique: true,
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeIndex('users', 'users_email_index')

		await queryInterface.dropTable('users')
	},
}
