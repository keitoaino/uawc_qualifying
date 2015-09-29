'use strict';

angular
  .module('loremPixelApp')
  .controller('CarouselCtrl', CarouselCtrl);

function CarouselCtrl ($scope, Image) {
  $scope.hasFavorites = Image.hasFavorites;
  $scope.loadCategory = loadCategory;
  $scope.nextImage = nextImage;
  $scope.prevImage = prevImage;
  $scope.switchImageSet = switchImageSet;
  $scope.toggleLike = toggleLike;

  activate();

  function activate () {
    $scope.categories = Image.categories();
    $scope.imageSet = 'category';
    $scope.selectedCategory = 'sports';

    $scope.carouselStyle = {
      width: Image.size().width + 'px',
      height: Image.size().height + 'px'
    };

    loadCategory();
  }

  function loadCategory () {
    $scope.images = Image.byCategory($scope.selectedCategory);
    $scope.carouselIndex = 0;
  }

  function loadFavorites () {
    $scope.images = Image.favorites();
    $scope.carouselIndex = 0;
  }

  function nextImage () {
    $scope.carouselIndex++;

    if ($scope.carouselIndex >= $scope.images.length) {
      $scope.carouselIndex = 0;
    }
  }

  function prevImage () {
    $scope.carouselIndex--;

    if ($scope.carouselIndex < 0) {
      $scope.carouselIndex = $scope.images.length - 1;
    }
  }

  function switchImageSet () {
    if ($scope.imageSet === 'category') {
      loadCategory();
    } else {
      loadFavorites();
    }
  }

  function toggleLike (image) {
    image.liked = !image.liked;

    Image.toggleLike(image);
  }
}
