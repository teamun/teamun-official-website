teamunApp.factory('QiniuService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    uptoken: $resource(DEFAULT_DOMAIN + '/uptoken', {})
  }
});
