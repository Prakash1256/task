import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add any required aliases here
    },
  },
  assetsInclude: ['**/*.png'], // Ensure PNG files are included as assets
  css: {
    preprocessorOptions: {
      // Configure CSS preprocessors if needed
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]', // Customize asset output directory
      },
    },
  },
});
