import commonjs from '@rollup/plugin-commonjs';
import sucrase from '@rollup/plugin-sucrase';

export default {
  input: `./src/main.ts`,
  output: {
    file: `dist/chekup-pack.js`,
    format: 'cjs',
    exports: 'auto',
  },
  plugins: [
    sucrase({
      exclude: ['node_modules/**'],
      transforms: ['typescript'],
      production: true,
    }),
    commonjs(),
  ],
};
