var path       = require('path');
var express    = require('express');
var browserify = require('browserify');
var less       = require('less-middleware');
var assign     = require('lodash.assign');
var serveIndex = require('serve-index');

var defaults = require("./lib/defaults");

module.exports = function(opts, done) {
  opts = assign(defaults, opts);

  // New server
  var app = express();

  var serverPath = path.resolve(opts.cwd);

  // Browserify
  if(opts.browserify) {
    app.get("/*.js", function(req, res) {
      browserify()
        .add(path.join(serverPath, req.params[0]+".js"))
        .bundle()
        .on("error", function(err) {
          console.error(err.toString())
        })
        .pipe(res);
    });
  }

  if(opts.less) {
    app.use(less(serverPath));
  }

  // Start a static server
  app.use(express.static(serverPath));

  app.use(
    serveIndex(serverPath, {
      'icons': true
    })
  );

  // Start a server
  var server = app.listen(opts.port, function(err) {
    if(err) return done(err);

    var serverInfo = server.address();
    var port       = serverInfo.port;
    var address    = serverInfo.address;
    var url        = 'http://'+address+':'+port;

    return done(undefined, url, {
      path: serverPath,
      address: address,
      port: port
    });

  });
};
