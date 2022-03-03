'use strict';

angular.module('occupied.directives', [])
    .directive('title', ['$rootScope', '$timeout', function($rootScope, $timeout) {
        return {
            link: function() {

                var listener = function(event, toState) {

                    $timeout(function() {
                        $rootScope.title = (toState.data && toState.data.pageTitle)
                            ? (toState.data.pageTitle + ' - Occupied City')
                            : 'Occupied City';
                    });
                };

                $rootScope.$on('$stateChangeSuccess', listener);
            }
        };
    }])

    .directive('external', function() {
        return {
            compile: function(element) {
                element.attr('target', '_blank');
            }
        };
    })

    .directive('compile', ['$compile', function ($compile) { // http://stackoverflow.com/a/17426614/2803757
        return function(scope, element, attrs) {
            scope.$watch(
                function(scope) {
                    return scope.$eval(attrs.compile);
                },
                function(value) {
                    element.html(value);
                    $compile(element.contents())(scope);
                }
            );
        };
    }])

;
