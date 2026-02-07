import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import tsconfig from "./tsconfig.json" with { type: "json" };

const config: Config = {
	extensionsToTreatAsEsm: [".ts"],
	moduleFileExtensions: ["js", "json", "ts"],
	rootDir: "src",
	testRegex: ".*\\.spec\\.ts$",
	transform: {
		"^.+\\.(t|j)s$": ["ts-jest", { useESM: true }],
	},
	 moduleNameMapper: {
    ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
      prefix: "<rootDir>/../", 
    }),
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
	testEnvironment: "node",
};

export default config;
