teamunApp.factory('EventService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    eventList: $resource(DEFAULT_DOMAIN + '/events')
  };
});
