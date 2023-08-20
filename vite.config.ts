import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      external: [
        'tests/**/*'
      ]
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/vitest.setup.ts',
  },
});

// NEXT: GITHUB ACTIONS !!!