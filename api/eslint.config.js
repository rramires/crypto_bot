import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs}'],
		plugins: { js, 'simple-import-sort': simpleImportSort },
		extends: ['js/recommended'],
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
])
