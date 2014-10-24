/**
 * 
 * https://github.com/davearata/convertible
 *
 * Copyright (c) 2014 Dave Arata
 * Licensed under the MIT license.
 */

'use strict';

/**
 * `Convertible` constructor.
 *
 * @api public
 */
function Convertible() {
  this._strategies = {};
}

/**
 * Utilize the given `strategy` with optional `name`, overridding the strategy's
 * default name.
 *
 * Examples:
 *
 *     convertible.use(new AWSStrategy(...));
 *
 *     convertible.use('local', new FFMpegStrategy(...));
 *
 * @param {String|Strategy} name
 * @param {Strategy} strategy
 * @return {convertible} for chaining
 * @api public
 */
Convertible.prototype.use = function(name, strategy) {
  if (!strategy) {
    strategy = name;
    name = strategy.name;
  }
  if (!name) {
    throw new Error('Transcoding strategies must have a name');
  }

  this._strategies[name] = strategy;
  return this;
};

/**
 * will transcode a video file using the given `strategy` name,
 * with optional `options` and `callback`.
 *
 * Examples:
 *
 *     convertible.transcode('aws');
 *
 * Options:
 *   - `path`             path to the input file
 *   - `startTime`        start decoding at the given offset
 *
 * @param {String} strategy
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */
Convertible.prototype.transcode = function(strategy, options, callback) {
  if(!!this._strategies[strategy]) {
    return this._strategies[strategy].transcode(options, callback);
  }

  throw new Error('No Transcoding Strategies exist with the given name');
};

/**
 * Expose `Convertible`.
 */
module.exports = Convertible;