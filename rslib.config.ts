import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'cjs',
      output: {
        target: 'node',
        distPath: {
          root: './lib',
        },
      },
    },
  ],
});
