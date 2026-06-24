import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

const resolve = (dir: string) => path.resolve(__dirname, dir)

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    // publicPath equivalent
    base: '/static',

    // Build output
    build: {
      outDir: 'dist',
      assetsDir: 'lib',
      // productionSourceMap: false
      sourcemap: false,
      // Suppress plugin timing warnings (SVG sprite generation is expected to take time)
      checks: {
        pluginTimings: false
      },
      rollupOptions: {
        onwarn(warning, warn) {
          // Suppress third-party warnings that are not actionable
          if (warning.message?.includes('@vueuse')) return
          if (warning.message?.includes('#__PURE__') && warning.id?.includes('node_modules')) return
          warn(warning)
        }
      }
    },

    // Alias and extensions
    resolve: {
      alias: {
        '@': resolve('src')
      },
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },

    // CSS: native SCSS support
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api', 'import']
        }
      }
    },

    // Dev server
    server: {
      port: 8082,
      open: false,
      // proxy: {
      //   '/api': {
      //     target: 'http://127.0.0.1:8088',
      //     changeOrigin: true
      //   }
      // }
    },

    plugins: [
      vue(),

      // SVG sprite plugin — replaces svg-sprite-loader chainWebpack rule
      createSvgIconsPlugin({
        iconDirs: [resolve('src/icons/svg'), resolve('src/icons/ant')],
        symbolId: 'icon-[name]',
        inject: 'body-last',
        customDomId: '__svg__icons__dom__'
      })
    ],

    define: {
      // Polyfill process.env for legacy libraries
      'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development')
    }
  }
})
