'use strict';
/**
 * @ngdoc overview
 * @name teamunApp
 * @description
 * #
 * 队部JS库依赖以及程序路由主配置文件
 */
var teamunApp = angular.module('teamunApp', [
  'ngAnimate',
  'ngSanitize',
  'mgcrea.ngStrap',
  'ui.router',
  'ngResource',
  'textAngular',
  'angularMoment',
  'toaster',
  'angular-carousel',
  'angular-loading-bar',
  'checklist-model',
  'dc.endlessScroll',
  'ja.qr',
  'acute.select',
  'ngFileUpload',
  'angularQFileUpload',
  'LocalStorageModule',
  'sticky'
]);


teamunApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;
  }])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$uiViewScrollProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider, $httpProvider) {

    $uiViewScrollProvider.useAnchorScroll();

    $stateProvider
      .state('root', {
        abstract: true,
        views: {
          '': {
            templateUrl: 'views/root.html'
          },
          'header': {
            templateUrl: 'views/header.html',
            controller: 'HeaderCtrl',
            controllerUrl: 'scripts/controller/header/header-ctrl'
          },
          'footer': {
            templateUrl: 'views/footer.html'
          }
        }
      })
      .state('root.main', {
        url: '/',
        views: {
          '': {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerUrl: 'scripts/controllers/main/main-ctrl'
          }
        }
      })
      /*------------------------------------------  activities  -----------------------------------------------*/
      .state('root.activity-list', {
        url: '/activity-list/:city',
        views: {
          '': {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerUrl: 'scripts/controllers/main/main-ctrl'
          }
        }
      })
      .state('root.activity-detail', {
        url: '/activity-detail/:activity_id',
        views: {
          '': {
            templateUrl: 'views/activities/activity-detail.html',
            controller: 'ActivityDetailCtrl',
            controllerUrl: 'scripts/controllers/activities/activity-detail-ctrl'
          }
        }
      })
      .state('root.activity-add', {
        url: '/activity-add',
        views: {
          '': {
            templateUrl: 'views/activities/activity-add.html',
            controller: 'ActivityAddCtrl',
            controllerUrl: 'scripts/controllers/activities/activity-add-ctrl'
          }
        }
      })
      .state('root.activity-edit', {
        url: '/activity-edit/:activity_id',
        views: {
          '': {
            templateUrl: 'views/activities/activity-edit.html',
            controller: 'ActivityEditCtrl',
            controllerUrl: 'scripts/controller/activities/activity-edit-ctrl'
          }
        }
      })
      /*------------------------------------------  activities groups  -----------------------------------------------*/
      .state('root.activity-add-group', {
        url: '/activity-add-group/:activity_id',
        views: {
          '': {
            templateUrl: 'views/activities/activity-add-group.html',
            controller: 'ActivityAddGroupCtrl',
            controllerUrl: 'scripts/controllers/activities/activity-add-group-ctrl'
          }
        }
      })
      .state('root.activity-group-members', {
        url: '/activity-group-members/:activity_id',
        views: {
          '': {
            templateUrl: 'views/activities/activity-group-members.html',
            controller: 'ActivityGroupMembersCtrl',
            controllerUrl: 'scripts/controllers/activities/activity-group-members-ctrl'
          }
        }
      })
      /*------------------------------------------  office actions  -----------------------------------------------*/
      .state('root.official-action-detail', {
        url: '/official-action-detail/:action_id',
        views: {
          '': {
            templateUrl: 'views/official-actions/official-action-detail.html',
            controller: 'OfficialActionDetailCtrl',
            controllerUrl: 'scripts/controllers/official-actions/official-action-detail-ctrl'
          }
        }
      })
      /*------------------------------------------  agreements  -----------------------------------------------*/
      .state('root.registration-agreement', {
        url: '/registration-agreement',
        views: {
          '': {
            templateUrl: 'views/agreements/registration-agreement.html',
            controller: 'RegistrationAgreementCtrl',
            controllerUrl: 'scripts/controllers/agreements/registration-agreement-ctrl'
          }
        }
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.when('', '/');

    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
  }]);


teamunApp.filter('nl2br', function($sce){
  return function(msg,is_xhtml) { 
    var is_xhtml = is_xhtml || true;
    var breakTag = (is_xhtml) ? '<br />' : '<br>';
    var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
    return $sce.trustAsHtml(msg);
  }
});

teamunApp.config(function($httpProvider) {
  $httpProvider.interceptors.push('TokenInterceptorService');
});

teamunApp.run(['BrowserAgentService', 'PageControlService', function(BrowserAgentService, PageControlService){
  //移动端隐藏头部尾部
  if(BrowserAgentService.isAndroidBrowser || BrowserAgentService.isAppleMobileBrowser){
    PageControlService.hideStructure(['footer','header']);
    PageControlService.hideCssClass(['customActivityDetailContent']);
  }
}]);

teamunApp.run(function($rootScope, $location, $window, $http, $state, DEFAULT_DOMAIN, AuthenticationService, SessionService, acuteSelectService) {

  acuteSelectService.updateSetting("templatePath", "/views/tpl");
  
  $rootScope.$on("$stateChangeStart", function(event, nextRoute, currentRoute) {
    //redirect only if both isLogged is false and no token is set
    if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredLogin && !AuthenticationService.isLogged && !$window.sessionStorage.token) {
      $location.path("/");
    }
  });

  // Array 在IE8下没有indexOf 方法。
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
      for (var i = (start || 0), j = this.length; i < j; i++) {
        if (this[i] === obj) {
          return i;
        }
      }
      return -1;
    };
  }

  // 需要用户登录才能看到的url
  var routespermission = [
    '/activity-add',
    '/activity-edit',
    '/activity-add-group'
  ];

  $rootScope.$on('$stateChangeStart', function() {
    if(SessionService.get('nickname')) {
      $rootScope.loginName = SessionService.get('nickname');
      $rootScope.isLogged = true;
    }
    // var $checkSessionServer = $http.post(DEFAULT_DOMAIN + '/siteUser/checkSession');
    if (routespermission.indexOf('/' + $location.path().split('/')[1]) !== -1) {
      if(!$rootScope.isLogged) {
        $location.path('/');
      }
    }
  });

});

teamunApp.constant('DEFAULT_DOMAIN', '/api');
