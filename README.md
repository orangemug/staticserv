# staticserv
Start a static server with browserify and less support

[![stability-unstable](https://img.shields.io/badge/stability-unstable-yellow.svg)][stability]
[![Dependency Status](https://david-dm.org/orangemug/staticserv.svg)][dm-prod]
[![Dev Dependency Status](https://david-dm.org/orangemug/staticserv/dev-status.svg)][dm-dev]

[stability]:   https://github.com/orangemug/stability-badges#unstable
[dm-prod]:     https://david-dm.org/orangemug/staticserv
[dm-dev]:      https://david-dm.org/orangemug/staticserv#info=devDependencies


## Install
To install

    npm install -g orangemug/staticserv


## Usage
To run

    $ staticserv --help
    Start a static webserver with browserify and less support.
    Usage: /usr/local/bin/staticserv [opts] [path]

    Options:
      --browserify  Enable browserify                           [default: true]
      --less        Enable less                                 [default: true]
      --port        Port to run server on, 0 picks random port  [default: 0]
      --open        Open a browser defaults to index.html
      --open-path   Open a browser with the path

So to serve up a modules `examples` directory

    staticserv examples/ --open
      path: /path/to/examples
      address: 0.0.0.0
      port: 52790


## License
[MIT](LICENSE)
