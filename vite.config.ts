/// <reference types="vitest" />

import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      core: resolve('./packages/core/src/'),
    },
  },
})
