teamunApp.controller('HeaderCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$location', 'toaster', '$timeout', 'SignupService', 'SigninService', 'SessionService', 'AuthenticationService', function($scope, $rootScope, $state, $stateParams, $location, toaster, $timeout, SignupService, SigninService, SessionService, AuthenticationService) {

  $scope.sendsmscode = function() {
    var code = {
      mobile: angular.element('#mobile').val()
    };
    SignupService.sendsmscode.save($.param(code), function(result) {
      // console.log(result);
    });
  };

  $scope.resetPassword = function(user) {
    SignupService.resetpasswd.save($.param(user), function(result) {
      if (result.ret === 1) {
        angular.element(document.querySelector('#findPassModal')).modal('hide');
        toaster.pop('success', '密码重置成功！');
        window.location.reload();
      } else {
        toaster.pop('error', '提示', result.msg);
      }
    });
  };

  $scope.signup = function(user) {
    SignupService.signup.save($.param(user), function(result) {
      if (result.ret === 1) {
        angular.element(document.querySelector('#signupModal')).modal('hide');
        SessionService.set('nickname', result.data.user.nickname);
        SessionService.set('mobile', result.data.user.mobile);
        AuthenticationService.isLogged = true;
        localStorage.token = result.data.token;

        $rootScope.loginName = result.data.user.nickname;
        $rootScope.isLogged = true;
        toaster.pop('success', '注册成功！');
        window.location.reload();
      } else {
        toaster.pop('error', '提示', result.msg);
      }
    });
  };

  $scope.signin = function(user) {
    SigninService.authenticate.save($.param(user), function(result) {
      if (result.ret === 1) {
        SessionService.set('nickname', result.data.user.nickname);
        SessionService.set('mobile', result.data.user.mobile);
        AuthenticationService.isLogged = true;
        localStorage.token = result.data.token;

        angular.element(document.querySelector('#signinModal')).modal('hide');
        $rootScope.loginName = result.data.user.nickname;
        $rootScope.isLogged = true;
        toaster.pop('success', '登陆成功！');
        window.location.reload();
      } else {
        // toaster.pop('error', '提示', result.msg);
        $scope.isPasswordError = true;
      }
    }, function(error) {
      toaster.pop('error', error.data.message);
    });
  }

  $scope.logout = function() {
    SessionService.destory('nickname');
    SessionService.destory('mobile');
    $rootScope.isLogged = false;
    AuthenticationService.isLogged = false;
    delete localStorage.token;
    toaster.pop('success', '退出成功！');
    $state.go('root.main');
  }

  $scope.islogged = function() {
    // if (SessionService.get('user')) return true;
    if (AuthenticationService.isLogged) return true;
  }

  $scope.closeSigninModal = function() {
    angular.element(document.querySelector('#signinModal')).modal('hide');
  }

}]);
