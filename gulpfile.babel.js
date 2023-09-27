//new esm2015 plus syntax

import gulp from 'gulp';
import yargs from 'yargs';
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import cleanCSS from 'gulp-clean-css';
import gulpIf from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
//import imagemin from 'gulp-imagemin';
const imagemin = require('gulp-imagemin');


// let imagemin;
// import('gulp-imagemin').then((gulpImagemin) => {
//   imagemin = gulpImagemin;
// });


const sass = gulpSass(dartSass);
//const imagemin = await import('gulp-imagemin');


const PRODUCTION = yargs.argv.prod;

const paths = {
  styles: {
    src: ['src/assets/scss/bundle.scss', 'src/assets/scss/admin.scss'],
    dest: 'dist/assests/css'
  },
  images: {
    src: 'src/assets/images/**/*.{jpg,jpeg,png,svg,gif}',
    dest: 'dist/assests/images'
  }
}


export const styles = () => {
  return gulp.src(paths.styles.src)
      .pipe(gulpIf(!PRODUCTION, sourcemaps.init()))
      .pipe(sass().on('error', sass.logError))
      .pipe(gulpIf(PRODUCTION, cleanCSS({compatibility: 'ie8'})))
      .pipe(gulpIf(!PRODUCTION, sourcemaps.write()))
      .pipe(gulp.dest(paths.styles.dest));
}

export const images = () => {
  
  return gulp.src(paths.images.src)
    .pipe(gulpIf(PRODUCTION, imagemin([], {})))
    .pipe(gulp.dest(paths.images.dest));
}

export const watch = () => {
  gulp.watch('src/assets/scss/**/*.scss', styles);
}
//export default styles;