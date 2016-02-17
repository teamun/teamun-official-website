teamunApp.controller('ActivityAddGroupCtrl', ['$scope', '$state', '$stateParams', '$location', 'toaster', '$timeout', 'ActivityService', function($scope, $state, $stateParams, $location, toaster, $timeout, ActivityService) {

  ActivityService.activity.get({activity_id: $stateParams.activity_id}, function(result) {
    $scope.activity = result.data.activity;
    $scope.activityStatusMap = result.data.activityStatusMap;
    $scope.activityGroupStatusMap = result.data.activityGroupStatusMap;

    $scope.deadlineTime = $scope.activity.startTime;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });


  ActivityService.activityGroups.get({activity_id: $stateParams.activity_id}, function(result) {
    $scope.activityGroups = result.data.activityGroups;
    $scope.activityGroupStatusMap = result.data.activityGroupStatusMap;

    $scope.signTime = $scope.activityGroups[0].signTime;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });


  $scope.saveActivityGroup = function(activityGroup) {
    var signTime = $scope.signTime ? $scope.signTime : '';
    var deadlineTime = $scope.deadlineTime ? $scope.deadlineTime : '';

    activityGroup.signTime = signTime;
    activityGroup.deadlineTime = deadlineTime;
    activityGroup.activity = $scope.activity._id;

    ActivityService.saveActivityGroup.save($.param(activityGroup), function(result) {    
      if(result.ret == 1) {
        angular.element(document.querySelector('#activityGroupModal')).modal('hide');
        toaster.pop('success', '添加成功！');
        $scope.activityGroups.unshift(result.data.activityGroup);
        //清空modal上次添加的数据
        $scope.activityGroup.name = '';
        $scope.activityGroup.numLimit = '';
        $scope.activityGroup.entryFee = '';
        delete $scope.activityGroup._id;
      } else {
        toaster.pop('error', result.msg);
      }
    }, function(error) {
      toaster.pop('error', error.data.msg);
    });
  };

  $scope.editGroup = function(activityGroupID, index) {
    ActivityService.activityGroupForEdit.get({activity_group_id: activityGroupID}, function(result) {
      $scope.activityGroup = result.data.activityGroup;
      $scope.signTime = result.data.activityGroup.signTime;
      $scope.deadlineTime = result.data.activityGroup.deadlineTime;
      $scope.arr_index = index;
      angular.element(document.querySelector('#updateActivityGroupModal')).modal('show');
    }, function(error) {
      toaster.pop('error', error.data.msg);
    });
  };

  $scope.updateActivityGroup = function(activityGroup) {
    activityGroup.signTime = $scope.signTime ? new Date($scope.signTime).getTime().toString() : '';
    activityGroup.deadlineTime = $scope.deadlineTime ? new Date($scope.deadlineTime).getTime().toString() : '';
    activityGroup.activity = $scope.activity._id;
    ActivityService.updateActivityGroup.update({activity_group_id: activityGroup._id}, $.param(activityGroup), function(result) {
      if(result.ret == 1) {
        angular.element(document.querySelector('#updateActivityGroupModal')).modal('hide');
        toaster.pop('success', '更新成功');
        $scope.activityGroups[$scope.arr_index] = result.data.activityGroup;
        //清空modal上次添加的数据
        $scope.activityGroup.name = '';
        $scope.activityGroup.numLimit = '';
        $scope.activityGroup.entryFee = '';
        delete $scope.activityGroup._id;
      } else {
        toaster.pop('error', result.msg);
      }
    }, function(error) {
      toaster.pop('error', error.data.msg);
    });
  };


  $scope.removeGroup = function(group) {
    if (confirm("确认删除该分组吗？")) {
      ActivityService.removeActivityGroup.remove({
        activity_group_id: group._id
      }, function(response) {
        toaster.pop('success', '删除成功');
        $scope.activityGroups.splice($scope.activityGroups.indexOf(group), 1);
      });
    }
  };
  
  $scope.publishGroup = function(activity) {
    ActivityService.publishActivity.update({activity_id: activity._id}, function(result) {
      $state.go('root.activity-detail', {activity_id: activity._id});
      toaster.pop('success', '发布成功');
    }, function(error) {
      toaster.pop('error', error.data.msg);
    });
  };

}]);
