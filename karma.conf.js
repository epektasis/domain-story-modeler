// configures browsers to run test against
// any of [ 'ChromeHeadless', 'Chrome', 'Firefox', 'IE', 'PhantomJS' ]
var browsers = ['ChromeHeadless'];


module.exports = function(karma) {
  karma.set({
    frameworks: ['browserify', 'mocha', 'chai'],

    files: ['test/spec/**/*Spec.js'],

    reporters: ['spec'],

    preprocessors: {
      'test/spec/**/*Spec.js': ['browserify'],
    },

    browsers: browsers,

    browserNoActivityTimeout: 0,

    singleRun: true,
    autoWatch: false,

    // browserify configuration
    browserify: {
      captureConsole: true,
      debug: true,
      transform: [
        [
          'stringify',
          {
            global: true,
            extensions: ['.bpmn', '.css']
          }
        ],
        [
          'babelify', {
            global: true,
            presets:['@babel/preset-env']
          }
        ]
      ]
    }
  });
};
