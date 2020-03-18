import { defineConfig } from 'umi';

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
