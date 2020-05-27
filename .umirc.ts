import { defineConfig } from 'umi';

export default defineConfig({
  antd: {
    dark: false,
  },
  dva: {
    immer: true,
    // hmr: true,
    skipModelValidate: true,
  },
  // dynamicImport: {
  //   loading: '@/components/Loading'
  // },
  proxy: {
    '/api': {
      target: 'http://192.168.0.104:3002',
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
