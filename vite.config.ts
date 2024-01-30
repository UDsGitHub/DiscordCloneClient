import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Create an alias for the public directory
      // so that we can use absolute paths in our code
      "components": path.resolve(__dirname, "./src/components"),
      "context": path.resolve(__dirname, "./src/context"),
      "model": path.resolve(__dirname, "./src/model"),
    },
  },
});
