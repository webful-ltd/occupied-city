'use strict';

describe('Occupied City', function() {

    browser.get('/');

    it('should load home page with correct route and city list shown', function() {
        expect(browser.getLocationAbsUrl()).toMatch("/");

        expect(element.all(by.css('[ui-view] h4')).get(1).getText()).
            toMatch('Cities');

        expect(element.all(by.css('[ui-view] li > a')).first().getText()).
            toMatch('Beijing');
    });

});
