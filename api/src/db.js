import Sequelize from 'sequelize'

export const database = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PWD,
	{
		dialect: process.env.DB_DIALECT,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		logging: process.env.NODE_ENV !== 'production' ? console.log : false,
	},
)
