'use strict'

const { orderType } = require('../src/@types/order-type.cjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('orders', orderType)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('orders')
	},
}
