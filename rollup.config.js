import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const input = 'src/index.ts';

export default [
  {
    input,
    output: {
      name: 'tweento',
      file: pkg.browser,
      format: 'umd',
      indent: false,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      babel({
        extensions: ['.ts'],
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-object-rest-spread'],
        exclude: 'node_modules/**',
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
    ],
  },
  {
    input,
    external: ['calliffn'],
    plugins: [
      typescript(),
      babel({
        extensions: ['.ts'],
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            { version: pkg.devDependencies['@babel/runtime'].replace(/^[^0-9]*/, '') },
          ],
        ],
        runtimeHelpers: true,
      }),
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
];
