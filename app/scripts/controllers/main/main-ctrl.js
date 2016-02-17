teamunApp.controller('MainCtrl', ['$scope', '$state', '$stateParams', '$location', 'toaster', '$http', 'ActivityService', 'HotService', function($scope, $state, $stateParams, $location, toaster, $http, ActivityService, HotService) {

  $scope.selectCity = $stateParams.city === undefined ? '' : $stateParams.city;
  $scope.items = $scope.items || [];
  ActivityService.activityList.get({page: 0, city: $scope.selectCity}, function(result) {
    if(result.ret === 1) {
      $scope.items.push.apply($scope.items, result.data.activities);
    }
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });
  
  $scope.newpage = 1;
  $scope.hasmore = true;
  if($scope.hasmore) {
    $scope.$on('endlessScroll:next', function() {
      load($scope.newpage);
      $scope.newpage++;
    });
  }

  function load(page) {
    if($scope.items && $scope.hasmore && $scope.items.length >= 10) {
      $scope.loading = true;
      $http.get('/api/site/activities?page=' + page + '&city=' + $scope.selectCity).success(function(data, status, headers) {
        $scope.pagination = angular.fromJson(headers('x-pagination'));
          $scope.items.push.apply($scope.items, data.data.activities);
          $scope.hasmore = data.data.hasmore;
      })["finally"](function() {
        $scope.loading = false;
      });
    }
  };

  HotService.hots.get({}, function(result) {
    if(result.ret === 1) {
      $scope.hots = result.data.hots;
    }
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });


}]);
