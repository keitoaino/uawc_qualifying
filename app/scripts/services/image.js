'use strict';

angular
  .module('loremPixelApp')
  .service('Image', ImageService);

function ImageService (IMAGE_COUNT) {
  var baseUrl = 'http://lorempixel.com/';
  var categories = [
    'sports',
    'abstract',
    'animals',
    'business',
    'cats',
    'city',
    'food',
    'nightlife',
    'fashion',
    'people',
    'nature',
    'technics',
    'transport'
  ];

  var favorites = [];
  var size = {
    width: 640,
    height: 480
  };

  this.byCategory = function (category) {
    var images = [];

    category = category || 'sports';

    for (var i = 0; i < IMAGE_COUNT; i++) {
      var url = baseUrl + size.width + '/' + size.height + '/' + category + '/' + (i + 1);
      images.push({
        url: url,
        liked: favorites.indexOf(url) > -1
      });
    }

    return images;
  };

  this.categories = function () {
    return categories;
  };

  this.hasFavorites = function () {
    return !!favorites.length;
  };

  this.favorites = function () {
    var images = [];

    favorites.forEach(function (image) {
      images.push({
        url: image,
        liked: true
      });
    });

    return images;
  };

  this.setSize = function (newSize) {
    newSize = {
      width: parseInt(newSize.width),
      height: parseInt(newSize.height)
    };

    // random min and max sizes ^_^
    if (!newSize.width || (newSize.width < 250)) newSize.width = 250;
    if (!newSize.height || (newSize.height < 250)) newSize.height = 250;

    if (newSize.width > 1920) newSize.width = 1920;
    if (newSize.height > 1920) newSize.height = 1920;

    size = newSize;
    favorites = [];
  };

  this.size = function () {
    return size;
  };

  this.toggleLike = function (image) {
    var index = favorites.indexOf(image.url);

    if (image.liked && (index === -1)) {
      favorites.push(image.url);
    }

    if (!image.liked && (index > -1)) {
      favorites.splice(index, 1)
    }
  };
}
