'use strict';
angular.module('teamunApp').directive('checkMobileCaptcha', ['$http', 'DEFAULT_DOMAIN', function($http, DEFAULT_DOMAIN) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      scope.$watch(attrs.ngModel, function() {
        var checkBody = {
          mobile: angular.element('#mobile').val(),
          code: angular.element('#' + attrs.checkMobileCaptcha).val()
        };
        if(checkBody.mobile !== '' && checkBody.code.length >= 6) {
          $http({
            method: 'POST',
            data: checkBody,
            url: DEFAULT_DOMAIN + '/auth/checksmscode'
          }).success(function(data) {
            if(data.ret === 1) {
              ctrl.$setValidity('check', true);
            } else {
              ctrl.$setValidity('check', false);
            }
          }).error(function() {
            ctrl.$setValidity('check', false);
          });
        }
      });
    }
  };
}]);
