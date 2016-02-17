teamunApp.factory('SigninService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    authenticate: $resource(DEFAULT_DOMAIN + '/auth/authenticate', {}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    })
  };
});
