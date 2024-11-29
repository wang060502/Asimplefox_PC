import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoImportPlugin from '@opentiny/unplugin-tiny-vue'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    autoImportPlugin('vite')
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    // port: 8080,
    proxy: {
      '/api': {
        target: 'http://139.196.195.212:8081', // 目标 API 服务器地址
        changeOrigin: true, // 是否改变源
        rewrite: (path) => path.replace(/^\/api/, ''), // 路径重写
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            if (req.headers.accept && req.headers.accept.includes('html')) {
              console.log('Skipping proxy for browser request.');
              res.writeHead(302, { Location: '/index.html' });
              res.end();
            }
          });
        }
      }
    }
  }
});
