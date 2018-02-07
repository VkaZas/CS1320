const gulp        = require('gulp');
const livereload  = require('gulp-livereload');
const sass        = require('gulp-sass');

gulp.task('sass', () => {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css/'))
});

gulp.task('watch', ['sass'], () => {
    livereload.listen();
    gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('default', ['watch', 'sass']);