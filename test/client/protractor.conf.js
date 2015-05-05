exports.config = {
    // Do not start a Selenium Standalone sever - only run this using chrome.
    directConnect: true,
    chromeDriver: '../../node_modules/protractor/selenium/chromedriver',

    allScriptsTimeout: 11000,

    specs: [
        'e2e/*.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://oc.localhost/app_dev.php/',

    framework: 'jasmine2',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
