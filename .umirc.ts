import { defineConfig } from 'umi';

export default defineConfig({
  antd: {
    dark: false,
  },
  dva: {
    immer: true,
    skipModelValidate: true,
  },
  dynamicImport: {
    loading: '@/components/Loading'
  },
  proxy: {
    '/api': {
      target: 'http://192.168.0.104:3002',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
});
