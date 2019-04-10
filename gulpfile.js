'use strict';
let gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    eslint = require('gulp-eslint'),
    sourcemaps = require("gulp-sourcemaps");
let cfg = require( './gulpconfig.json' );
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');

const webpack = require("webpack");
const webpackconfig = require("./webpack.config.js");
const webpackstream = require("webpack-stream");

// Define tasks after requiring dependencies
function style() {
    return gulp
        .src(cfg.styles.src)
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest(cfg.styles.dest))
        .pipe(browserSync.stream())
}

function styleMin() {
    return (
        gulp
            .src(cfg.styles.src)
            // Initialize sourcemaps before compilation starts
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            // Use postcss with autoprefixer and compress the compiled file using cssnano
            .pipe(postcss([autoprefixer(), cssnano()]))
            // Now add/write the sourcemaps
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(cfg.styles.dest))
            .pipe(browserSync.stream())
    );
}

function imageMin() {
    return (
        gulp
            .src(cfg.images.src)
            .pipe(imagemin())
            .pipe(gulp.dest(cfg.images.dest))
    )
}

function scriptsLint() {
    return gulp
        .src([cfg.scripts.src, './gulpfile.js'])
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function scripts() {
    return (
        gulp
            .src(cfg.scripts.src)
            .pipe(plumber())
            .pipe(concat('scripts.js'))
            .pipe(gulp.dest(cfg.scripts.dest))
            //.pipe(rename('scripts.min.js'))
            //.pipe(webpackstream(webpackconfig, webpack))
            //.pipe(uglify())
            //.pipe(gulp.dest(cfg.scripts.dest))
            .pipe(browserSync.stream())
    )
}

function watch() {
    browserSync.init(cfg.browserSyncWatchFiles, cfg.browserSyncOptions);
    gulp.watch(cfg.styles.src, style);
    gulp.watch(cfg.scripts.src, scripts);
    gulp.watch("src/images/*", imageMin);
}

// Don't forget to expose the task!
exports.watch = watch;
exports.style = style;
exports.styleMin = styleMin;
exports.imageMin = imageMin;
exports.scripts = scripts;
exports.scriptsLint = scriptsLint;
