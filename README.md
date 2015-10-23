# Metalsmith FeedParser Plugin [![NPM version](https://img.shields.io/npm/v/metalsmith-feedparser.svg)](https://www.npmjs.org/package/metalsmith-feedparser)

[![Build Status](https://img.shields.io/travis/RobLoach/metalsmith-feedparser/master.svg)](https://travis-ci.org/RobLoach/metalsmith-feedparser)
[![Dependency Status](https://david-dm.org/RobLoach/metalsmith-feedparser.png)](https://david-dm.org/RobLoach/metalsmith-feedparser)

[Metalsmith](http://metalsmith.io) plugin to import content from an RSS feed with [FeedParser](https://github.com/danmactough/node-feedparser).

## Installation

    npm install --save metalsmith-feedparser

### CLI

If you are using the command-line version of Metalsmith, you can install via npm, and then add the `metalsmith-feedparser` key to your `metalsmith.json` file:

```json
{
  "plugins": {
    "metalsmith-feedparser": {}
  }
}
```

### JavaScript

If you are using the JS Api for Metalsmith, then you can require the module and add it to your `.use()` directives:

```js
var feedparser = require('metalsmith-feedparser');

metalsmith.use(feedparser());
```

## Usage

TODO: Add usage documentation.

## License

MIT
