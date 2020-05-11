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
  dynamicImport: {
    loading: '@/components/Loading'
  },
  proxy: {
    '/api': {
      target: 'http://120.79.12.65:3003',
      pathRewrite: { '^/api': '' },
      changeOrigin: true,
    },
  },
  // analyze: {
  //   analyzerMode: 'server',
  //   analyzerPort: 3333,
  //   openAnalyzer: true,
  //   generateStatsFile: false,
  //   statsFilename: 'stats.json',
  //   logLevel: 'info',
  //   defaultSizes: 'parsed'
  // }
});
