teamunApp.controller('ActivityDetailCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$location', 'toaster', 'ActivityService', 'SessionService', 'UserService', function($scope, $rootScope, $state, $stateParams, $location, toaster, ActivityService, SessionService, UserService) {

	//生成活动二维码
	$scope.qrurl = $location.absUrl();
  $scope.isCaptain = false;
  ActivityService.activity.get({activity_id: $stateParams.activity_id}, function(result) {
  	if(result.ret === 1) {
  		$scope.activity = result.data.activity;
	    $scope.activityStatusMap = result.data.activityStatusMap;
	    $scope.activityGroupStatusMap = result.data.activityGroupStatusMap;
	    //判断是否是自己创建的活动
	    if ($scope.activity.captain.mobile === SessionService.get("mobile")) {
	      $scope.isCaptain = true;
	    }
  	} else {
  		toaster.pop('error', result.msg);
  	}
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });


  $scope.isSignin = true;
  if(SessionService.get("mobile")) {
  	UserService.user.get({mobile: SessionService.get("mobile")}, function(result) {
	    if (result.ret === 1) {
	      $scope.user = result.data.user;
	    } else {
	      toaster.pop('error', result.msg);
	    }
	  }, function(error) {
	    toaster.pop('error', error.data.msg);
	  });
  } else {
  	$scope.isSignin = false;
  }


  $scope.join = function(groupId) {
    ActivityService.join.update({activity_group_id: groupId}, function(result) {
      if (result.ret == 1) {
        toaster.pop('success', '报名成功！');
        //成功后重新获取一下活动信息，免于刷新页面
        ActivityService.activity.get({
			    activity_id: $stateParams.activity_id
			  }, function(result) {
			    $scope.activity = result.data.activity;
			    $scope.activityStatusMap = result.data.activityStatusMap;
			    $scope.activityGroupStatusMap = result.data.activityGroupStatusMap;
			    //判断是否是自己创建的活动
			    if ($scope.activity.captain.mobile === SessionService.get("mobile")) {
			      $scope.isCaptain = true;
			    }
			  }, function(error) {
			    toaster.pop('error', error.data.msg);
			  });
      } else {
        toaster.pop('error', result.msg);
      }
    }, function(error) {
      toaster.pop('error', error.data.msg);
    });
  };


  $scope.joinAndUpdateUserInfo = function(user) {
    delete user.__v;
  	if(!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/i.test(user.idcard)) {
      toaster.pop('error', '身份证号码格式不正确');
      return false;
    }

    UserService.updateUser.update({user_id: user._id}, $.param(user), function(result) {
      if(result.ret === 1) {
      	ActivityService.join.update({
		      activity_group_id: angular.element(document.querySelector('#groupID')).val()
		    }, function(result) {
		      if (result.ret == 1) {
		      	angular.element(document.querySelector('#joinModal')).modal('hide');
		        toaster.pop('success', '报名成功！');
		        //成功后重新获取一下活动信息，免于刷新页面
		        ActivityService.activity.get({
					    activity_id: $stateParams.activity_id
					  }, function(result) {
					    $scope.activity = result.data.activity;
					    $scope.activityStatusMap = result.data.activityStatusMap;
					    $scope.activityGroupStatusMap = result.data.activityGroupStatusMap;
					    //判断是否是自己创建的活动
					    if ($scope.activity.captain.mobile === SessionService.get("mobile")) {
					      $scope.isCaptain = true;
					    }
					  }, function(error) {
					    toaster.pop('error', error.data.msg);
					  });
		      } else {
		        toaster.pop('error', result.msg);
		      }
		    }, function(error) {
		      toaster.pop('error', error.data.msg);
		    });
      } else {
      	toaster.pop('error', result.msg);	
      }
    }, function(error) {
      toaster.pop('error', error.data.msg);
    });
  };


  $scope.quit = function(groupId) {
    ActivityService.quit.update({activity_group_id: groupId}, function(result) {
      if (result.ret == 1) {
        toaster.pop('success', '成功退出！');
        //成功后重新获取一下活动信息，免于刷新页面
        ActivityService.activity.get({
			    activity_id: $stateParams.activity_id
			  }, function(result) {
			    $scope.activity = result.data.activity;
			    $scope.activityStatusMap = result.data.activityStatusMap;
			    $scope.activityGroupStatusMap = result.data.activityGroupStatusMap;
			    //判断是否是自己创建的活动
			    if ($scope.activity.captain.mobile === SessionService.get("mobile")) {
			      $scope.isCaptain = true;
			    }
			  }, function(error) {
			    toaster.pop('error', error.data.msg);
			  });
      } else {
        toaster.pop('error', result.msg);
      }
    }, function(error) {
      toaster.pop('error', error.data.msg);
    });
  };


  $scope.publishGroup = function(activity) {
    ActivityService.publishActivity.update({activity_id: activity._id}, function(result) {
    	if (result.ret == 1) {
    		$state.go($state.current, {}, {
	        reload: true
	      });
    	} else {
        toaster.pop('error', result.msg);
      }
      toaster.pop('success', '发布成功');
    }, function(error) {
      toaster.pop('error', error.data.msg);
    });
  };

}]);
