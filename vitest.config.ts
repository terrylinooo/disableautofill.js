import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    reporters: 'verbose',
    setupFiles: [resolve(__dirname, 'vitest.setup.ts')],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
    },
  },
});
