const {src, dest, watch} = require('gulp');
const rollup = require('rollup')
const gulpUglify = require('gulp-uglify');
const gulpRename = require('gulp-rename');
const gulpConnect = require('gulp-connect');
const rollupOptions =  require('./rollup.config.js')

async function rollupTask() {
  const watcher = await rollup.watch(rollupOptions);
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
  return src(`dist/*.js`)
      .pipe(dest('doc/js'))
      .pipe(gulpUglify())
      .pipe(gulpRename({ extname: '.min.js' }))
      .pipe(dest('doc/js'))
}

function reloadTack(){
  return src('doc/**')
      .pipe(gulpConnect.reload())
}

function watchTask(){
  watch('doc/**', reloadTack)
  watch('dist/**', copyTask)
}

function serverTask(){
  gulpConnect.server({
    root: 'doc',
    port: 8007,
    livereload: true
  })
}

module.exports = function(cb){
  serverTask()
  watchTask()
  rollupTask()
  cb()
}
