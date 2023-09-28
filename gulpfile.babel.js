//new esm2015 plus syntax

import gulp from 'gulp';
import yargs from 'yargs';
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import cleanCSS from 'gulp-clean-css';
import gulpIf from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import { hideBin } from 'yargs/helpers';
import webpack from 'webpack-stream';
import named from 'vinyl-named';
import browserSync from 'browser-sync';
import zip from 'gulp';
import path from 'path';
import replace from 'gulp-replace';
import  info  from './package.json';


const server = browserSync.create();
const imagemin = require('gulp-imagemin');

const sass = gulpSass(dartSass);



const PRODUCTION = yargs(hideBin(process.argv)).argv.prod;

/******** defining paths *********/

const paths = {
  styles: {
    src: ['src/assets/scss/bundle.scss', 'src/assets/scss/admin.scss'],
    dest: 'dist/assests/css'
  },
  images: {
    src: 'src/assets/images/**/*.{jpg,jpeg,png,svg,gif}',
    dest: 'dist/assests/images'
  },
  scripts: {
    src: ['src/assets/js/bundle.js', 'src/assets/js/admin.js'],
    dest: 'dist/assests/js'
  },
  other: {
    src: ['src/assets/**/*', '!src/assets/{images, js, scss}',
          '!src/assets/{images, js, scss}/**/*'],
    dest: 'dist/assests'
  }
  
  /**********************************************************
  creating a package for the final bundling
  also defining the files/folders to be ignored with '!file/foldername'
  ***********************************************************/

  /****** 
  commenting out this section waiting for 'invalid glob arguements error' to be resolved
  package: {
    src:  ['**', '!.vscode', '!node_modules{,/**}', '!packaged{,/**}', '!src{,/**}', 
          '!.babelrc', '!.gitignore', '!gulpfile.babel.js', ,'!npm-shrinkwrap.json', 
          '!package.json', '!package-lock.json'] ,
    dest: 'packaged'
  }
  */
  
}

/*******creating a task for server **********/
export const serve = (done) => {
  server.init ({
    proxy: "http://localhost:8888/shivitestthemes"
  });
  done();
}

/******* creating a task for auto reload files *********/
export const reload = (done) => {
  server.reload();
  done();
}
/****** creating a task for cleaning/deleting files/images/data in dist folder *********/
export const clean = () =>  del(['dist']);

export const styles = () => {
  return gulp.src(paths.styles.src)
      .pipe(gulpIf(!PRODUCTION, sourcemaps.init()))
      .pipe(sass().on('error', sass.logError))
      .pipe(gulpIf(PRODUCTION, cleanCSS({compatibility: 'ie8'})))
      .pipe(gulpIf(!PRODUCTION, sourcemaps.write()))
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(server.stream());
}

/***** creating a task to compress images *****/
export const images = () => {
  
  return gulp.src(paths.images.src)
    .pipe(gulpIf(PRODUCTION, imagemin([], {})))
    .pipe(gulp.dest(paths.images.dest));
}

/******** creating a watch task *******/
export const watch = () => {
  gulp.watch('src/assets/scss/**/*.scss', styles);
  gulp.watch('src/assets/js/**/*.js', gulp.series(scripts, reload));
  gulp.watch('**/*.php', reload);
  gulp.watch(paths.images.src, gulp.series(images, reload));
  gulp.watch(paths.other.src, gulp.series(copy, reload));
  
}


export const copy= () => {
  return gulp.src(paths.other.src)
    .pipe(gulp.dest(paths.other.dest));
}

/******* minimizing contents in js files *******/

export const scripts = () => {
  return gulp.src(paths.scripts.src)
    .pipe(named())
      .pipe(webpack({module: {
        rules: [
            {
        test: /\.js$/,
        use: {
                loader: 'babel-loader',
            options: {
            presets: ['@babel/preset-env'] //or ['babel-preset-env']
        }
        }
    }
]
    },
output: {
    filename: '[name].js'
    },
externals: {
  jQuery: 'jQuery'
},
devtool: !PRODUCTION ? 'inline-source-map' : false,
    mode: PRODUCTION ? 'production' : 'development' //add this
}))
  //.pipe(gulpIf(PRODUCTION, uglify())) //you can skip this now since mode will already minify
  .pipe(gulp.dest(paths.scripts.dest));
}


/****** creating task for compressing files and folders in zip package *******/

/*****commenting out till error gets resolved 
export const compress = () => {
  return (gulp.src(paths.package.src))
    .pipe(replace('_themename', info.name))
    .pipe(zip('${info.name}.zip'))
    .pipe(gulp.dest(paths.package.dest));
}
*******/

export const dev = gulp.series(clean, gulp.parallel(styles, scripts, images, copy), serve, watch);
export const build = gulp.series(clean, gulp.parallel(styles, scripts, images, copy));

/*** 
 ****** waiting for error to get resolved 

export const bundle = gulp.series(build, compress);

***/
export default dev;


