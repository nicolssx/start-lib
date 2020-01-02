const {src, dest, watch} = require('gulp');
const rollup = require('rollup')
const gulpUglify = require('gulp-uglify');
const gulpRename = require('gulp-rename');
const rollupOptions =  require('./rollup.config.js')

async function rollupTask() {
  const bundle = await rollup.rollup(rollupOptions);
  await bundle.write(rollupOptions.output);
}

function copyTask(){
  return src(`dist/*.js`)
      .pipe(dest('doc/js'))
      .pipe(gulpUglify())
      .pipe(gulpRename({ extname: '.min.js' }))
      .pipe(dest('doc/js'))
}

async function defaultTask(){
  await rollupTask()
  copyTask()
}

module.exports = function(cb){
  defaultTask()
  cb()
}
