var extend = require('extend');
var async = require('async');
var clone = require('clone');
var match = require('minimatch').match;
var request = require('request');
var FeedParser = require('feedparser');

/**
 * Helper function to retrieve a clean filename from original content.
 */
function getFilename (original, extension) {
  return original.replace(/[^a-z0-9]/gi, '').toLowerCase().substring(0, 40) + '.' + extension;
}

module.exports = function (opts) {
  // Prepare the options.
  opts = opts || {};
  opts.pattern = opts.pattern || '*.feedparser';

  // Execute the plugin.
  return function (files, metalsmith, done) {
    /**
     * Process the given file. Call done() when done processing.
     */
    function processFile (filename, done) {
      // Find which URL to use.
      var url = files[filename].feedparser || false;
      if (url) {
        // Load up the request object stream.
        var req = request(url);

        // Create the FeedParser object.
        var feedparser = new FeedParser(files[filename]);

        // Set the error responses.
        req.on('error', done);
        feedparser.on('error', done);

        // Pipe the requested data over to FeedParser.
        req.on('response', function (res) {
          if (res.statusCode !== 200) {
            return this.emit('error', new Error('Bad status code'));
          }
          this.pipe(feedparser);
        });

        // When finished, delete the original feedparser file.
        feedparser.on('end', function () {
          delete files[filename];
          done();
        });

        // When data from the request comes in.
        feedparser.on('readable', function () {
          // Parse through every RSS item.
          for (var item = this.read(); item !== null; item = this.read()) {
            // Construct the new RSS feed item file.
            var newFile = clone(files[filename]);
            // Find the contents.
            newFile.contents = new Buffer(item.description || item.summary);
            // Inject additional properties from the original file.
            extend(newFile, item);

            // Find a new filename for the item to live.
            var newFilename = getFilename(newFile.title || newFile.guid, newFile.extension || 'html');
            files[newFilename] = newFile;
          }
        });
      } else {
        // Error out if no URL is found.
        done('FeedParser URL `file.feedparser` not set.');
      }
    }

    // Filter out all the files we are to ignore.
    var results = match(Object.keys(files), opts.pattern, { matchBase: true });

    // Process each file.
    async.map(results, processFile, done);
  };
};
