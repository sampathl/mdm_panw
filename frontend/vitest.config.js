import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // Enables React Fast Refresh and JSX support
  test: {
    globals: true, // Enables global test functions like `describe`, `it`, etc.
    environment: 'jsdom', // Simulates a browser-like environment for testing React components
    setupFiles: './src/setupTests.js', // Path to a setup file for global configurations
    css: true, // Enables CSS support in tests
    coverage: {
      provider: 'istanbul', // Enables code coverage reporting
      reporter: ['text', 'html'], // Outputs coverage reports in text and HTML formats
    },
  },
  coverage: {
    provider: 'istanbul', // Enables code coverage
    reporter: ['text', 'html'], // Outputs coverage reports in text and HTML formats
  },
});
