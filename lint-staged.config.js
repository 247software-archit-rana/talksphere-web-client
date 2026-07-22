export default {
	'.prettierrc': 'prettier --write',
	'*.webmanifest': 'prettier --write',
	'*.{ts,js,tsx,jsx}': ['eslint', 'prettier --write'],
	'*.{css,md,html,json,yaml,yml}': 'prettier --write',
};
