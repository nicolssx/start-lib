const devTask = require('./build/gulpfile.dev.js')
const provTask = require('./build/gulpfile.build.js')

exports.default = devTask
exports.build = provTask
