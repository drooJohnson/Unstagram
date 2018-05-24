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
        //
        // Original credentials from partcycle repo
        applicationId: '25475',
        access: 'd51e66b8c39a659bee4fb4b8b9871b1154098ae440afb921e6378e7dbc9affb2',
        secret: 'b1a25efbe3dbd0dbf7faa2d456f50f9a1cc88115fd4038216c327a439781d771',
        //
        // Additional credentials to work around API rate limit of 50 requests per hour.
        //applicationId: '27385',
        //access: '5d0529cd13def792c592b3c30dc16ece8cbe756bcbe4af57d9dfbec7b6c19a5f',
        //secret: '6cc03c46e407d4a3041792134b50069ac68f6f6532207187b606a34346387541',
        //applicationId: '27436',
        //access: '6e28673dca40bb907db4a1053721f2ce59c3254e86ca9a9c3643dbd815398c23',
        //secret: '9b4eeadbec61a61d7a1f8f89bfe471e646f4513ad6a1417dc5a8fa5e9f259d06',
        //applicationId: '27442',
        //access: 'cca590546a3dd5e734ae4c62e915c105111ce69926443c9dbabf483d22087f66',
        //secret: '57fed8a28936de6b48c4d59f6f4dfda39e3a89fa3d762b4d402e1fc10e1c827e',
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
