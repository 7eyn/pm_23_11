const { src, dest, watch, series, parallel } = require("gulp");
const fileInclude = require("gulp-file-include");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();

function htmlTask() {
  return src("src/app/*.html", { allowEmpty: true })
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      }),
    )
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}

function scssTask() {
  return src("src/app/scss/main.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cssnano())
    .pipe(concat("index.min.css"))
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}

function jsTask() {
  return src("src/app/js/**/*.js", { allowEmpty: true })
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream());
}

function imgTask() {
  return src("src/app/imgs/**/*", { encoding: false, allowEmpty: true })
    .pipe(imagemin())
    .pipe(dest("dist/imgs"));
}

function serveTask(done) {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
    notify: false,
    open: true,
  });
  done();
}

function watchTask() {
  watch("src/app/**/*.html", htmlTask);
  watch("src/app/scss/**/*.scss", scssTask);
  watch("src/app/js/**/*.js", jsTask);
  watch("src/app/imgs/**/*", imgTask);
  watch("src/app/data.json", dataTask).on("change", browserSync.reload);
}

function bootstrapCss() {
  return src("node_modules/bootstrap/dist/css/bootstrap.min.css").pipe(
    dest("dist/css"),
  );
}
function bootstrapJs() {
  return src("node_modules/bootstrap/dist/js/bootstrap.bundle.min.js").pipe(
    dest("dist/js"),
  );
}
function bootstrapIcons() {
  return src("node_modules/bootstrap-icons/font/**/*", {
    encoding: false,
  }).pipe(dest("dist/css"));
}
function dataTask() {
  return src("src/app/data.json", { allowEmpty: true }).pipe(dest("dist"));
}
const build = parallel(
  htmlTask,
  scssTask,
  jsTask,
  imgTask,
  bootstrapCss,
  bootstrapJs,
  bootstrapIcons,
  dataTask,
);

exports.html = htmlTask;
exports.scss = scssTask;
exports.js = jsTask;
exports.img = imgTask;
exports.build = build;
exports.default = series(build, parallel(serveTask, watchTask));

exports.bootstrapCss = bootstrapCss;
exports.bootstrapJs = bootstrapJs;
