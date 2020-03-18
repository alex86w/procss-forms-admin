import { defineConfig } from 'umi';
const path = require('path');

export default defineConfig({
  antd: {
    dark: false,
  },
  dva: {
    immer: true,
    hmr: true,
    skipModelValidate: true,
  },
});
