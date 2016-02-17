teamunApp.controller('ActivityGroupMembersCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$location', 'toaster', 'ActivityService', 'SessionService', 'UserService', function($scope, $rootScope, $state, $stateParams, $location, toaster, ActivityService, SessionService, UserService) {

  ActivityService.groupmembers.get({
    activity_id: $stateParams.activity_id
  }, function(result) {
    $scope.groupmembers = result.data;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

}]);
