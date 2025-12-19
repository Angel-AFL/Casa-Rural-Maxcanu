// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// ⚠️ Importa el adaptador de Node.js, ya que lo necesitarás para output: 'server'
import node from "@astrojs/node"; 

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
  
  // 🚨 LÍNEA CRUCIAL: Cambia el modo de salida a server
  output: 'server',
  
  // 🚨 ADAPTADOR: Debes especificar qué adaptador de Node usarás para el servidor
  adapter: node({
      mode: 'standalone',
  }),
});