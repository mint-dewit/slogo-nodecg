const path = require('path')

module.exports = {
	root: true,
	env: {
		node: true,
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		project: path.join(__dirname, 'tsconfig.browser.json'),
		extraFileExtensions: ['.vue'],
	},
	globals: {
		nodecg: 'readonly',
		NodeCG: 'readonly',
	},
	extends: ['plugin:vue/essential', './node_modules/@sofie-automation/code-standard-preset/eslint/main'],
	rules: {
		// Everything is compiled for the browser so dev dependencies are fine.
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		// Allows "main.vue" files to be named as such.
		'vue/multi-word-component-names': ['error', { ignores: ['main'] }],
	},
}
