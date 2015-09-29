'use strict';

angular
  .module('loremPixelApp')
  .controller('SettingsCtrl', SettingsCtrl);

function SettingsCtrl ($scope, Image) {
  $scope.updateSize = updateSize;

  activate();

  function activate () {
    $scope.size = Image.size();
  }

  function updateSize () {
    Image.setSize($scope.size);
  }
}
