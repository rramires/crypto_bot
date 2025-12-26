'use strict'

import { syncSymbols } from '../src/controllers/symbols-controller.js'

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface, Sequelize) {
		await syncSymbols()
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('symbols', null, {})
	},
}
