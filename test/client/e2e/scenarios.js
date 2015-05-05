'use strict';

describe('Occupied City', function() {

    browser.get('app_dev.php/');

    it('should load home page with correct route and city list shown', function() {
        expect(browser.getLocationAbsUrl()).toEqual('/');

        expect(element.all(by.css('[ui-view] h4')).get(1).getText()).
            toEqual('Cities');

        expect(element.all(by.css('[ui-view] li > a')).first().getText()).
            toEqual('Beijing');

        // Every page's core layout should include a home link with ARIA label
        var h1Link = element.all(by.css('#header h1 > a')).first();
        expect(h1Link.getAttribute('ui-sref')).toEqual('home');
        expect(h1Link.getAttribute('aria-label')).toEqual('Occupied City home page');

    });

    it('should load a city and include ARIA labels on key elements', function() {
        var firstCityLink = element.all(by.css('[ui-view] li > a')).first();
        firstCityLink.click();

        expect(browser.getCurrentUrl()).toMatch(new RegExp('/Beijing$'));

        // Check city heading loads with link and correct ARIA label
        var h4Link = element.all(by.css('[ui-view] h4 > a')).first();
        expect(h4Link.getText()).toEqual('Beijing');
        expect(h4Link.getAttribute('ng-click')).toEqual('restart()');
        expect(h4Link.getAttribute('aria-label')).toEqual('View Beijing from the start.');

        // Check buttons load with correct disabled status and ARIA properties
        var back = element.all(by.css('.city-nav-container .back')).first();
        var next = element.all(by.css('.city-nav-container .next')).first();
        expect(back.getText()).toEqual('<');
        expect(back.getAttribute('aria-label')).toEqual('Back');
        expect(back.getAttribute('disabled')).toEqual('true');
        expect(back.getAttribute('aria-disabled')).toEqual('true');
        expect(next.getText()).toEqual('>>');
        expect(next.getAttribute('aria-label')).toEqual('Forward');
        expect(next.getAttribute('disabled')).toBeNull();
        expect(next.getAttribute('aria-disabled')).toEqual('false');

    })

});
