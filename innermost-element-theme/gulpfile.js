const path = require('path')
const gulp = require('gulp')
const cssWrap = require('gulp-css-wrap')
const replace = require('gulp-replace')
gulp.task('css-white-wrap', () => {
  return gulp.src(path.resolve('./white-theme/theme/index.css'))
    .pipe(replace('fonts/element-icons', '~element-ui/lib/theme-chalk/fonts/element-icons'))
    .pipe(cssWrap({
      selector: '.innermost-white-theme'
    }))
    .pipe(gulp.dest('../src/utils/theme/white-theme'))
})
gulp.task('css-black-wrap', () => {
  return gulp.src(path.resolve('./black-theme/theme/index.css'))
    .pipe(replace('fonts/element-icons', '~element-ui/lib/theme-chalk/fonts/element-icons'))
    .pipe(cssWrap({
      selector: '.innermost-black-theme'
    }))
    .pipe(gulp.dest('../src/utils/theme/black-theme'))
})
