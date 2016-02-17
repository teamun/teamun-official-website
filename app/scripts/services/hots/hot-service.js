teamunApp.factory('HotService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    hots: $resource(DEFAULT_DOMAIN + '/site/hots'),
  };
});
