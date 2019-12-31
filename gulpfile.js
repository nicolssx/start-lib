const {src, dest, watch} = require('gulp');
const rollup = require('rollup');
const rollupCommonjs = require('rollup-plugin-commonjs');
const rollupNodeResolve = require('rollup-plugin-node-resolve');
const rollupBabel = require('rollup-plugin-babel');
const rollupJson = require('rollup-plugin-json');
const gulpUglify = require('gulp-uglify');
const gulpRename = require('gulp-rename');
const {name, version, main} = require('./package.json');

async function rollupTask() {
  const watcher = await rollup.watch({
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
  });
  await watcher.on('event', event => {
    // event.code 会是下面其中一个：
    //   START        — 监听器正在启动（重启）
    //   BUNDLE_START — 构建单个文件束
    //   BUNDLE_END   — 完成文件束构建
    //   END          — 完成所有文件束构建
    //   ERROR        — 构建时遇到错误
    //   FATAL        — 遇到无可修复的错误
  });
}

function copyTask(){
  return src(`dist/${name}.v${version}.js`)
      .pipe(dest('doc/js'))
      .pipe(gulpUglify())
      .pipe(gulpRename({ extname: '.min.js' }))
      .pipe(dest('doc/js'))
}

exports.default = (cb)=>{
  // rollupTask()
  copyTask()
  cb()
}
