var gulp = require('gulp');  
var sourcemaps = require('gulp-sourcemaps');  
var ts = require('gulp-typescript');  
var babel = require('gulp-babel');

var tsProject = ts.createProject('./tsconfig.json');

gulp.task('default', function() {  
    return gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(babel({
            presets: ['es2015', 'transform-runtime']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});