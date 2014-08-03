var open       = require('open');
var yargs      = require('yargs');
var staticserv = require('../');

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

staticserv(argv, function(err, url, data) {
  console.log('Server started at: <%s>', url);
  for(var k in data) {
    console.log('  %s: %s', k, data[k]);
  }

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
