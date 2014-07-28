var path       = require('path');
var express    = require('express');
var browserify = require('browserify');
var yargs      = require('yargs');
var open       = require('open');
var less       = require('less-middleware');

var argv = yargs
  .usage('Start a static webserver with browserify and less support.\nUsage: $0 [opts] [path]')
  .describe("browserify", "Enable browserify")
  .default("browserify", true)
  .describe("less", "Enable less")
  .default("less", true)
  .describe("port", "Port to run server on, 0 picks random port")
  .default("port", 0)
  .boolean("open")
  .describe("open", "Open a browser defaults to index.html")
  .describe("open-path", "Open a browser with the path")
  .argv;

if(argv.help) {
  yargs.showHelp();
  process.exit(0);
}

// New server
var app = express();

var serverPath = argv._[0] || __dirname;

// Start a static server
app.use(express.static(serverPath));

// Browserify
if(argv.browserify) {
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

if(argv.less) {
  app.use(less(serverPath));
}


// Start a server
var server = app.listen(argv.port, function() {
  var url = 'http://localhost:'+server.address().port;

  console.log('Server started');
  console.log('  path: %s', serverPath);
  console.log('  url:  %s', url);

  var aOpen     = argv.open;
  var aOpenPath = argv['open-path'];

  if(aOpen || aOpenPath) {
    var urlpath = "";
    if(aOpenPath) {
      urlpath = path.relative(serverPath, aOpenPath);
    }
    open(url+'/'+urlpath);
  }
});

