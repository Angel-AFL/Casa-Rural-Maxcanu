// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://casa-rural-maxcanu.vercel.app",
  integrations: [react()],
  output: "server",
  adapter: vercel({}),
});
