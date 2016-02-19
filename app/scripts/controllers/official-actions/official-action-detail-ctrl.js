teamunApp.controller('OfficialActionDetailCtrl', 
  ['$scope', '$rootScope', '$state', '$stateParams', '$location', 'toaster', 'OfficialActionService', 'SessionService', 'UserService', 
  'AuthenticationService','BrowserAgentService' , 'TeamunNativeAppService', 
  function($scope, $rootScope, $state, $stateParams, $location, toaster, OfficialActionService, SessionService, UserService, 
    AuthenticationService, BrowserAgentService, TeamunNativeAppService) {
  //生成活动二维码
  $scope.qrurl = $location.absUrl();

  //获取官方动态详情
  OfficialActionService.action.get({action_id: $stateParams.action_id}, function(result) {
    if(result.ret === 1) {
      $scope.action = result.data.action;
    } else {
      toaster.pop('error', result.msg);
    }
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

  $scope.isSignin = false;

  $scope.isTeamunAppWebview = BrowserAgentService.isTeamunAppWebView;
  //如果浏览器是teamun app webview并且未登录
  if($scope.isTeamunAppWebview && !SessionService.get("mobile")) {
    TeamunNativeAppService.invokeNativeFunction('jsTakeToken').then(function(onlineUser){
      if(typeof onlineUser !== 'undefined'){
        $rootScope.isLogged = true;
        AuthenticationService.isLogged = true;
        SessionService.set('nickname', onlineUser.nickname);
        SessionService.set('mobile', onlineUser.mobile);
        localStorage.token = onlineUser.token;
        $rootScope.loginName = onlineUser.nickname;
        $scope.isSignin = true;

        UserService.user.get({
            mobile: SessionService.get("mobile")
          }, function(result) {
            if (result.ret === 1) {
              $scope.user = result.data.user;
            } else {
              toaster.pop('error', result.msg);
            }
          }, function(error) {
            toaster.pop('error', error.data.msg);
        });
      };
      
    },function(error){
      alert('页面加载异常，请刷新页面重试！');
    });
  }else{
    if(SessionService.get("mobile")) {
      $scope.isSignin = true;
      UserService.user.get({
        mobile: SessionService.get("mobile")
      }, function(result) {
        if (result.ret === 1) {
          $scope.user = result.data.user;
        } else {
          toaster.pop('error', result.msg);
        }
      }, function(error) {
        toaster.pop('error', error.data.msg);
      });
    };
  };

  $scope.join = function(groupId) {
    OfficialActionService.join.update({
      recruit_group_id: groupId
    }, function(result) {
      if (result.ret == 1) {
        toaster.pop('success', '报名成功！');
        //成功后重新获取一下信息，免于刷新页面
        OfficialActionService.action.get({
          action_id: $stateParams.action_id
        }, function(result) {
          $scope.action = result.data.action;
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

  $scope.teamunAppLogin = function(){
    TeamunNativeAppService.invokeNativeFunction('jsToLogin');
  };

  $scope.joinAndUpdateUserInfo = function(user) {
    delete user.__v;
    UserService.updateUser.update({user_id: user._id}, $.param(user), function(result) {
      if(result.ret === 1) {
        OfficialActionService.join.update({
          recruit_group_id: angular.element(document.querySelector('#groupID')).val()
        }, function(result) {
          if (result.ret == 1) {
            angular.element(document.querySelector('#joinModal')).modal('hide');
            toaster.pop('success', '报名成功！');
            //成功后重新获取一下信息，免于刷新页面
            OfficialActionService.action.get({
              action_id: $stateParams.action_id
            }, function(result) {
              $scope.action = result.data.action;
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
    OfficialActionService.quit.update({
      recruit_group_id: groupId
    }, function(result) {
      if (result.ret == 1) {
        toaster.pop('success', '成功退出！');
        //成功后重新获取一下信息，免于刷新页面
        OfficialActionService.action.get({
          action_id: $stateParams.action_id
        }, function(result) {
          $scope.action = result.data.action;
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
}]);
