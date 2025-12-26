'use strict'

const { symbolType } = require('../src/@types/symbol-type.cjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		queryInterface.createTable('symbols', symbolType)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('symbols')
	},
}
