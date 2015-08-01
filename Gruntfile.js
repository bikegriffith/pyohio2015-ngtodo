module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.initConfig({
    protractor: {
      options: {
        configFile: "protractor-conf.js",
        keepAlive: false,
        noColor: false
      },
      run: {}
    }
  });

  grunt.registerTask('test', [
    'protractor'
  ]);
};
