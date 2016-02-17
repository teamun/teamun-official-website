'use strict';
angular.module('teamunApp').directive('ensureUniqueEmail', ['$http', 'DEFAULT_DOMAIN', function($http, DEFAULT_DOMAIN) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      scope.$watch(attrs.ngModel, function() {
        var checkBody = {
          email: angular.element('#' + attrs.ensureUniqueEmail).val()
        };
        if (checkBody.email !== '') {
          $http({
            method: 'POST',
            data: checkBody,
            url: DEFAULT_DOMAIN + '/check-available-email'
          }).success(function(data) {
            if (data.ret === 1) {
              ctrl.$setValidity('unique', true);
            } else {
              ctrl.$setValidity('unique', false);
            }
          }).error(function() {
            ctrl.$setValidity('unique', false);
          });
        }
      });
    }
  };
}]);
