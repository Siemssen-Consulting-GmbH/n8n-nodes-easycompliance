/**
 * ESLint-Konfiguration nach dem Muster des offiziellen n8n-nodes-starter:
 * eslint-plugin-n8n-nodes-base prüft die n8n-spezifischen Konventionen
 * (Benennung, Beschreibungstexte, Optionssortierung), die auch bei der
 * Verifizierung durch n8n herangezogen werden.
 */
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
	},
	ignorePatterns: ['dist/**', 'node_modules/**', 'scripts/**'],
	overrides: [
		{
			files: ['./credentials/**/*.ts'],
			plugins: ['eslint-plugin-n8n-nodes-base'],
			extends: ['plugin:n8n-nodes-base/credentials'],
		},
		{
			files: ['./nodes/**/*.ts'],
			plugins: ['eslint-plugin-n8n-nodes-base'],
			extends: ['plugin:n8n-nodes-base/nodes'],
		},
	],
};
