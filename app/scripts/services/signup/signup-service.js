teamunApp.factory('SignupService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    signup: $resource(DEFAULT_DOMAIN + '/auth/signup', {}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }),
    sendsmscode: $resource(DEFAULT_DOMAIN + '/auth/sendsmscode', {}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }),
    resetpasswd: $resource(DEFAULT_DOMAIN + '/auth/resetpasswd', {}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    })
  };
});
