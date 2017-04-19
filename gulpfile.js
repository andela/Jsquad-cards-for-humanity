
// Include gulp
const gulp = require('gulp');

// Include gulp plugins
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const bower = require('gulp-bower');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
// const browsersync = require('browser-sync);

gulp.task('lint', () => gulp.src(['public/js/**/*.js', 'test/**/*.js', 'app/**/*.js', '!node_modules/**'])
    .pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failAfterError()));


/* gulp.task('default', ['lint']);*/

gulp.task('sass', () => gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('.public/css')));
gulp.task('sass:watch', () => {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('startnodemon', () => {
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: { NODE_ENV: 'development' }
  });
});

// Run install command for bower; used a custom update command "update"
gulp.task('dobower', () => bower({ cmd: 'update' }));

gulp.task('test',['pre-test'], () => gulp.src(['./test/**/*.js'], {
	read: false
})
.pipe(mocha({reporter: 'spec'})) 
.pipe(istanbul.writeReports())
    // Enforce a coverage of at least 90% 
.pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));