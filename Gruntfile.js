module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    protractor: {
      options: {
        configFile: "protractor-conf.js",
        keepAlive: false,
        noColor: false
      },
      run: {}
    },
    watch: {
      scripts: {
        files: ['static/js/*.js', 'static/partials/*.html'],
        tasks: ['test'],
        options: { debounceDelay: 2000 }
      },
    }
  });

  grunt.registerTask('test', [
    'protractor'
  ]);
};
