'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'unstagram',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Hard-coding credentials is BAD and we would NEVER do this in a production app.
      // This is ONLY done to make setup of this repo as easy as possible because
      // the purpose of this project is not to test how well a candidate can set up
      // a dev environment.
      unsplash: {
        applicationId: '25475',
        access: 'd51e66b8c39a659bee4fb4b8b9871b1154098ae440afb921e6378e7dbc9affb2',
        secret: 'b1a25efbe3dbd0dbf7faa2d456f50f9a1cc88115fd4038216c327a439781d771',
        callbackUrl: 'localhost'
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
