// @ts-check
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{
		ignores: ["eslint.config.mjs", "dist", "node_modules"],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	eslintPluginPrettierRecommended,
	{
		files: ["**/*.ts", "**/*.js", "**/*.mts", "**/*.mjs"],
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
			sourceType: "module",
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			"@typescript-eslint/no-redundant-type-constituents": "error",
			"no-restricted-syntax": [
				"error",
				{
					selector: "ImportDeclaration[source.value=/^\\./]:not([source.value=/\\.js$/]):not([source.value=/\\.json$/])",
					message: "В NodeNext/ESM относительные импорты должны заканчиваться на .js (или .json)."
				},
			],
			"prettier/prettier": [
				"error",
				{
					endOfLine: "auto",
					singleQuote: false,
					trailingComma: "all",
					tabWidth: 2,
					useTabs: true,
					semi: true,
					printWidth: 80,
				},
			],
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-floating-promises": "warn",
			"@typescript-eslint/no-unsafe-argument": "warn",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ argsIgnorePattern: "^_" },
			],
			"@typescript-eslint/no-misused-promises": [
				"error",
				{ checksVoidReturn: false },
			],
		},
	},
);
