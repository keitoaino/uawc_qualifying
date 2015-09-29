'use strict';

angular
  .module('loremPixelApp')
  .config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'partials/carousel.html',
          controller: 'CarouselCtrl'
        })
        .when('/settings', {
          templateUrl: 'partials/settings.html',
          controller: 'SettingsCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(true);
    }
  ]);
