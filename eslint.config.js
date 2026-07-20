import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
	globalIgnores(['dist/*', 'coverage/*', 'build/*']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [js.configs.recommended, tseslint.configs.strict, reactHooks.configs.flat.recommended, reactRefresh.configs.vite, eslintConfigPrettier],
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			eqeqeq: 'error',
			'no-alert': 'error',
			'dot-notation': 'error',
			'prefer-const': 'error',
			'prefer-template': 'error',
			'default-param-last': 'off',
			'default-case-last': 'error',
			'no-useless-concat': 'error',
			'prefer-object-has-own': 'warn',
			'no-console': ['error', { allow: ['warn', 'error'] }],
			'no-duplicate-imports': ['error', { allowSeparateTypeImports: true }],

			// React
			'react-hooks/set-state-in-effect': 'warn',

			// TypeScript
			'@typescript-eslint/prefer-for-of': 'error',
			'@typescript-eslint/default-param-last': 'error',
			'@typescript-eslint/consistent-type-exports': 'error',
			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/no-unused-vars': ['error', { args: 'all', argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_', ignoreRestSiblings: true }],
		},
	},
	{
		files: ['src/main.tsx'],
		rules: {
			'@typescript-eslint/no-non-null-assertion': 'off',
		},
	},
]);
