const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const livereload = require('gulp-livereload');

gulp.task('js', () =>
    gulp.src("src/js/*.js")
       .pipe(babel({
           presets: ['@babel/env']
       }))
       .pipe(gulp.dest("public/js/"))
);

gulp.task('sass', () =>
    gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css/'))
);

gulp.task('watch', ['sass', 'js'], () => {
    livereload.listen();
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['js']);
});

gulp.task('default', ['watch', 'sass', 'js']);