let projectFolder = "dist"
let sourceFolder = "src"

let path = {
  build: {
    html: projectFolder + "/",
    css: projectFolder + "/css/",
    js: projectFolder + "/scripts/",
    img: projectFolder + "/img/",
    icons: projectFolder + /icons/,
    fonts: projectFolder + "/css/fonts/"
  },
  src: {
    html: [sourceFolder + "/**/*.html", "!" + sourceFolder + "/**/_*.html"],
    css: sourceFolder + "/style/**/index.css",
    js: sourceFolder + "/scripts/index.js",
    img: sourceFolder + "/img/**/*.{jpg,png,gif,ico,webp}",
    icons: sourceFolder + "/icons/*.svg",
    fonts: sourceFolder + "/style/fonts/*.{ttf,otf}"
  },
  watch: {
    html: sourceFolder + "/**/*.html",
    css: sourceFolder + "/style/**/*.css",
    js: sourceFolder + "/**/*.js",
    img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    icons: sourceFolder + "/icons/*.svg",
  },
  clean: "./" + projectFolder + "/"
}

let {src, dest} = require('gulp'),
  gulp = require('gulp'),
  browsersync = require("browser-sync").create(),
  fileinclude = require('gulp-file-include'),
  htmlmin = require('gulp-htmlmin'),
  del = require('del'),
  concat = require('gulp-concat-css'),
  autoprefixer = require('gulp-autoprefixer'),
  groupMedia = require('gulp-group-css-media-queries'),
  cleanCss = require('gulp-clean-css'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify-es').default,
  imagemin = require('gulp-imagemin'),
  svgSprite = require('gulp-svg-sprite')

function browserSync(params) {
  browsersync.init({
    server:{
      baseDir: "./" + projectFolder + "/"
    },
    port: 3000,
    notify: false
  })
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function css() {
  return src(path.src.css)
    .pipe(concat('index.css'))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true
      })
    )
    .pipe(groupMedia())
    .pipe(cleanCss())
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function images() {
  return src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false}],
      interlaced: true,
      optimisationLevel: 3
    }))
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

function icons() {
  return src(path.src.icons)
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../icons.svg",
          example: true
        }
      }
    }))
    .pipe(dest(path.build.icons))
    .pipe(browsersync.stream())
}

function fonts(params) {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
}

function watchFiles(params) {
  gulp.watch([path.watch.html], html)
  gulp.watch([path.watch.css], css)
  gulp.watch([path.watch.js], js)
  gulp.watch([path.watch.img], images)
  gulp.watch([path.watch.icons], icons)
}

function clean(params) {
  return del(path.clean)
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, icons, fonts))
let watch = gulp.parallel(build, watchFiles, browserSync)


exports.icons = icons
exports.images = images
exports.fonts = fonts
exports.js = js
exports.css = css
exports.html = html
exports.build = build
exports.watch = watch
exports.default = watch
















//
