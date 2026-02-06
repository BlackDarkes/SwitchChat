import { type UserConfig, defineConfig, loadEnv } from "vite";
import type { InlineConfig } from "vitest/node";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

interface IVitestConfigExport extends UserConfig {
  test?: InlineConfig;
}

export default defineConfig(({ mode }): IVitestConfigExport => {
  const env = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [
			react({
				babel: {
					plugins: [["babel-plugin-react-compiler"]],
				},
			}),
      tailwindcss(),
		],
		server: {
			port: 8080,
      host: env.VITE_HOST,
      hmr: true,
      cors: true,
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: ({ replace }) => replace(/^\/api/, ""),
        }
      }
		},
    preview: { port: 3000 },
    resolve: {
      alias: {
        "@/app": resolve(__dirname, "./src/app"),
        "@/pages": resolve(__dirname, "./src/pages"),
        "@/widgets": resolve(__dirname, "./src/widgets"),
        "@/features": resolve(__dirname, "./src/features"),
        "@/entities": resolve(__dirname, "./src/entities"),
        "@/shared": resolve(__dirname, "./src/shared"),
        "@/libs": resolve(__dirname, "./src/libs"),
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./setupTests.ts"],
    }
	};
});
