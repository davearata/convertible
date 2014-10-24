'use strict';

var assert = require('assert');
var convertible = require('../lib');
var sinon = require('sinon');

var sandbox;

describe('convertible node module.', function () {
  beforeEach(function(){
    sandbox = sinon.sandbox.create();
    convertible._strategies = {};
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('must be initialized with an empty stratgies object', function () {
    assert.ok(!!convertible._strategies);
  });

  it('must require strategy name', function () {
    assert.throws(function () {
      convertible.use({});
    }, /Transcoding strategies must have a name/);
  });

  it('must add strategy when its passed as first param to use', function () {
    convertible.use({
      name: 'testStrategy'
    });

    assert.ok(!!convertible._strategies.testStrategy);
  });

  it('must add strategy with custom name', function () {
    convertible.use('customName', {
      name: 'testStrategy'
    });

    assert.ok(!convertible._strategies.testStrategy);
    assert.ok(!!convertible._strategies.customName);
  });

  it('should throw an error if transcode is called with a non existant strategy', function () {
    assert.throws(function () {
      convertible.transcode('testStrategy', {});
    }, /No Transcoding Strategies exist with the given name/);
  });

  it('should call transcode if the strategy exists', function () {
    convertible.use({
      name: 'testStrategy',
      transcode: sandbox.spy()
    });
    convertible.transcode('testStrategy', {});
    assert(convertible._strategies.testStrategy.transcode.calledOnce);
  });
});
