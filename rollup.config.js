import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import {name, version, main} from './package.json'

// dev模式-> 运行：生成访问doc/index。 src 文件变更，重新打包到dist。监听dist文件夹，文件变更，重新拷贝文件至doc。监听DOC，文件变更，浏览器刷新。
// build模式 -> 运行：清理dist,打包到dist,清理doc/lib，dist文件拷贝至doc/lib.

export default {
  input: main,
  output: {
    file:  `dist/${name}.v${version}.js`,
    format: 'umd',
    name: name
  },
  plugins: [
    nodeResolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    json
  ],
  // 指出应将哪些模块视为外部模块来引用，不会打包在库里
  external: []
}
