import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true, // Automatically open the browser
  },
  resolve: {
    alias: {
      phaser: 'phaser/dist/phaser.js',
    },
  },
});
