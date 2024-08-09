/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { join } from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/app',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [TanStackRouterVite({
    routesDirectory: join(__dirname, 'src/routes'),
    generatedRouteTree: join(__dirname, 'src/routeTree.gen.ts'),
    routeFileIgnorePrefix: '-',
    quoteStyle: 'single',
  }), react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //   plugins: [nxViteTsPaths()],
  // },

  build: {
    outDir: '../../dist/apps/app',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
