import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'

export default [
	js.configs.recommended,
	{
		files: ['**/*.{js,mjs,cjs}'],
		plugins: { 'simple-import-sort': simpleImportSort },
		languageOptions: { globals: globals.node },
	},
	{
		rules: {
			'prefer-const': 'warn',
			'no-unused-vars': 'off',
			'simple-import-sort/imports': 'error',
			/* 'simple-import-sort/exports': 'error', */
		},
	},
	eslintConfigPrettier,
]
