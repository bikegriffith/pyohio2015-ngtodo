exports.config = {
  specs: ['static/js/app.test.js'],
  seleniumServerJar: 'protractor-support/selenium-server-standalone-2.47.1.jar',
  chromeDriver: '/usr/local/bin/chromedriver'
  /*
  // NOTE: Running headless is possible but problematic
  capabilities: {
    'browserName': 'phantomjs',
    'phantomjs.binary.path': '/usr/local/lib/node_modules/phantomjs/lib/phantom/bin/phantomjs',
    'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
  }
  */
};
