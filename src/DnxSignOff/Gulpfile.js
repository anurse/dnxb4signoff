﻿/// <binding Clean='clean' />

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  fs = require("fs"),
  sass = require("gulp-sass");

eval("var project = " + fs.readFileSync("./project.json"));

var paths = {
    bower: "./bower_components/",
    lib: "./" + project.webroot + "/lib/",
    css: "./" + project.webroot + "/css/",
    scss: "./scss/"
};

gulp.task("clean", function (cb) {
    rimraf(paths.lib, cb);
});

gulp.task("bower", function () {
    var bower = {
        "primer-css": "primer-css/css/primer.css",
        "octicons": "octicons/octicons/octicons.{css,eot,svg,ttf,woff}",
        "jquery": "jquery/dist/jquery.{min.js,js,map}",
        "jquery-validation": "jquery-validation/dist/jquery.validate.{min.js,js}",
        "jquery-validation-unobtrusive": "jquery-validation-unobtrusive/jquery.validate.unobtrusive.{min.js,js}",
    }

    for (var destinationDir in bower) {
        gulp.src(paths.bower + bower[destinationDir])
          .pipe(gulp.dest(paths.lib + destinationDir));
    }
});

gulp.task("sass", function () {
    gulp.src(paths.scss + '*.scss')
            .pipe(sass())
            .pipe(gulp.dest(paths.css));
});

gulp.task("build", ["sass", "bower"], function () {
});
