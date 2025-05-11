import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'cjs',
      syntax: 'es2019',
      output: {
        target: 'node',
        distPath: {
          root: './lib',
        },
      },
    },
  ],
});
