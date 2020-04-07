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
      target: 'http://192.168.0.104:3001',
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
