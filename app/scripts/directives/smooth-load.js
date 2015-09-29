'use strict';

angular
  .module('loremPixelApp')
  .directive('smoothLoad', smoothLoadDirective);

function smoothLoadDirective () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.css({
        opacity: 0
      });

      element.on('load', function () {
        element.css({
          opacity: 1
        });
      });
    }
  };
}
