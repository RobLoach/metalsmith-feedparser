var assert = require('assert');
var feedparser = require('../');
var Metalsmith = require('metalsmith');

function test (name, options) {
  /* globals it describe */
  it(name, function (done) {
    Metalsmith('test/fixtures/' + name)
      .use(feedparser(options || {}))
      .build(function (err, files) {
        if (err) {
          return done(err);
        }
        assert(Object.keys(files).length > 5);
        return done();
      });
  });
}

describe('metalsmith-feedparser', function () {
  test('basic');
});
