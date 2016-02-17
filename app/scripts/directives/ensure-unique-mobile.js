'use strict';
angular.module('teamunApp').directive('ensureUniqueMobile', ['$http', 'DEFAULT_DOMAIN', function($http, DEFAULT_DOMAIN) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      scope.$watch(attrs.ngModel, function() {
        var checkBody = {
          mobile: angular.element('#' + attrs.ensureUniqueMobile).val()
        };
        if (checkBody.mobile && checkBody.mobile.length >= 11) {
          $http({
            method: 'POST',
            data: checkBody,
            url: DEFAULT_DOMAIN + '/check-available-mobile'
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
