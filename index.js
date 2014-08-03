var path       = require('path');
var express    = require('express');
var browserify = require('browserify');
var less       = require('less-middleware');

module.exports = function(opts, done) {
  // New server
  var app = express();

  var serverPath = opts.cwd || process.cwd();

  // Start a static server
  app.use(express.static(serverPath));

  // Browserify
  if(opts.browserify) {
    app.get(serverPath+"/*.js", function(req, res) {
      browserify()
        .add(req.params[0]+".js")
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
