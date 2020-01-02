const {name, version, main} = require('../package.json');
const rollupCommonjs = require('rollup-plugin-commonjs');
const rollupNodeResolve = require('rollup-plugin-node-resolve');
const rollupBabel = require('rollup-plugin-babel');
const rollupJson = require('rollup-plugin-json');

module.exports = {
  input: main,
  output: {
    file:  `dist/${name}.v${version}.js`,
    format: 'umd',
    name: name
  },
  plugins: [
    rollupNodeResolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    rollupCommonjs(),
    rollupBabel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    rollupJson
  ],
  // 指出应将哪些模块视为外部模块来引用，不会打包在库里
  external: [],
  watch: {}
}
