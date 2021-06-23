import { defineConfig, UserConfigExport, ConfigEnv } from 'vite'
import viteCompression from 'vite-plugin-compression'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const isProduction = mode === 'production'
  const plugins = [vue()]

  if (isProduction) {
    plugins.push(
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      }),
      // viteCompression() // compress file to gzip
    )
  }

  return defineConfig({
    base: './',
    plugins,
    resolve: {
      alias: [{
        find: '@',
        replacement: resolve(__dirname, './src')
      }],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/styles/common";'
        }
      }
    },
    build: {
      target: 'es2015',
      cssCodeSplit: true,
      minify: !isProduction ? 'esbuild' : 'terser',
      terserOptions: {
        compress: { drop_console: isProduction}
      }
    }
  })
}

