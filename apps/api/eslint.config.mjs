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
			globals: { ...globals.node, ...globals.jest },
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			"prettier/prettier": "off", 
			
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
			"@typescript-eslint/no-floating-promises": "warn",
			"@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
		},
	},
);
