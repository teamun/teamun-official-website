teamunApp.factory('CityService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    cityList: $resource(DEFAULT_DOMAIN + '/cities'),
    city: $resource(DEFAULT_DOMAIN + '/cities/:city_id', {city_id: '@city_id'})
  };
});
