module.exports = function (config) {
  config.set({
    browsers: ['ChromeHeadlessNoSandbox, ChromeHeadless'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-web-security',
          '--remote-debugging-port=9222',
        ],
      },
    },
    autoWatch: false,
    singleRun: true,
  });
};
