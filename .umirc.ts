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
      // target: 'http://192.168.0.108:3002',
      target:'http://47.108.81.165:3003/',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
});
