teamunApp.factory('UserService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    user: $resource(DEFAULT_DOMAIN + '/users/by-mobile/:mobile', {mobile: '@mobile'}),
    updateUser: $resource(DEFAULT_DOMAIN + '/users/:user_id', {user_id: '@user_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
  };
});
