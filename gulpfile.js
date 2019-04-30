var gulp = require("gulp");
var ts = require("gulp-typescript");
var gulpDeployFtp = require("gulp-deploy-ftp");
var clean = require("gulp-clean");
var nodemon = require("gulp-nodemon");
var child = require("child_process");
var moment = require("moment");
var fs = require("fs");
var typedoc = require("gulp-typedoc");
var paths = {
  dist: "dist",
  logs: "logs/*",
  tsSources: "src/**/*.ts"
};

var server;
var serverLog = fs.createWriteStream(
  "./logs/" + moment().format("YYYY-MM-DD HH-mm") + ".log",
  { flags: "a" }
);

var run = function () {
  if (server) if (server.kill) server.kill();

  server = child.spawn("node", [fs.existsSync("./dist/debug_ignore.js") ? "./dist/debug_ignore.js" : "./dist/debug.js"], {
    stdio: "inherit"
  });
};

gulp.task("upload", ["release"], function () {
  // TO DO
  return gulp.src("path/to/file").pipe(
    gulpDeployFtp({
      remotePath: "/tmp",
      host: "localhost",
      port: 21,
      user: "foo",
      pass: "bar"
    })
  );
});

gulp.task("cleanLogs", function () {
  return gulp.src(paths.logs, { read: false }).pipe(clean());
});

// clean dist folder
gulp.task("clean", function (cb) {
  return gulp.src(paths.dist, { read: false }).pipe(clean());
});

// compile typescripts
gulp.task("ts", function () {
  return gulp
    .src(paths.tsSources)
    .pipe(
      ts({
        noImplicitAny: false,
        target: "es6",
        lib: ["es6", "es2017.string"],
        sourceMap: true,
        module: "CommonJS",
        baseUrl: ".",
        paths: {
          "*": ["node_modules/*", "src/types/*"]
        }
      })
    )
    .pipe(gulp.dest(paths.dist));
});

// whats typescripts , compile and then run
gulp.watch(paths.tsSources, ["run"]);
// gulp.watch(paths.tsSources, ["typedoc"]);

// clean before build
gulp.task("preBuild", ["clean"]);

// clean and compile
gulp.task("build", ["preBuild", "ts"], function () { });


gulp.task("typedoc", function () {
  //
  //  "doc": "typedoc --theme minimal --hideGenerator --includeDeclarations --excludeExternals --excludePrivate --excludeNotExported  --out ./doc ./src"
  //
  return gulp
    .src([paths.tsSources,
      './node_modules/serendip-business-model/src/auth/*.ts',
      './node_modules/serendip-business-model/src/db/*.ts',
      './node_modules/serendip-business-model/src/Server*.ts'])
    .pipe(typedoc({
      // TypeScript options (see typescript docs)
      module: "commonjs",
      target: "es5",
      includeDeclarations: true,
      excludePrivate: true,
      excludeProtected: true,
      excludeExternals: true,
      readme: 'doc.md',
      hideGenerator: true,
      exclude: ['./src/debug_ignore.ts', './src/debug.ts'],
      // Output options (see typedoc docs)
      out: "./doc",
      json: "./doc.json",

      // TypeDoc options (see typedoc docs)
      name: "Serendip Framework",
      // theme: "minimal",
      theme: "markdown",
      ignoreCompilerErrors: false,
      version: true,
    }))

});

gulp.task("production", function () {
  glob("./dist/**/*.js", {}, function (er, files) {
    // files is an array of filenames.
    console.log(files);
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // er is an error object or null.
    gulpBundleFiles({
      parentTaskName: "production",
      concat: {
        active: true,
        config: {}
      },
      uglify: {
        active: false,
        config: {}
      },
      sourcemap: {
        active: true,
        config: {}
      },
      destinationFolder: "./production",
      newLine: ";",
      files: {
        "all.js": files
      }
    });
  });
});
// compile and run node process
gulp.task("run", ["ts"], run);

gulp.task("default", ["build", "run"], function () { });
