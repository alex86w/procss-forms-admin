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
  proxy: {
    '/api': {
      target: 'http://192.168.0.107:3001',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
});
