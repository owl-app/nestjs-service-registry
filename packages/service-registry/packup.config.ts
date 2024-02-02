import { defineConfig, Config } from '@strapi/pack-up';

const config: Config = defineConfig({
  bundles: [
    {
      source: './src/index.ts',
      import: './dist/web/index.mjs',
      require: './dist/web/index.js',
      types: './dist/web/src/index.d.ts',
      runtime: 'web',
    },
    {
      source: './src/index.ts',
      import: './dist/server/index.mjs',
      require: './dist/server/index.js',
      types: './dist/server/src/index.d.ts',
      tsconfig: './server/tsconfig.build.json',
      runtime: 'node',
    },
  ],
  externals: ['path'],

  dist: './dist',
  /**
   * Because we're exporting a server & client package
   * which have different runtimes we want to ignore
   * what they look like in the package.json
   */
  exports: {},
});

export default config;
