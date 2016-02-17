teamunApp.controller('ActivityEditCtrl', ['$scope', '$location', '$state', '$stateParams', 'toaster', '$timeout', 'Upload', '$qupload', '$log', 'QiniuService', 'ActivityService', 'EventService', 'CityService', 'OrganizerService', 'SessionService', 'DEFAULT_DOMAIN', function($scope, $location, $state, $stateParams, toaster, $timeout, Upload, $qupload, $log, QiniuService, ActivityService, EventService, CityService, OrganizerService, SessionService, DEFAULT_DOMAIN) {

  EventService.eventList.get({}, function(result) {
    $scope.events = result.data.events;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

  CityService.cityList.get({}, function(result) {
    $scope.cities = result.data.cities;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

  OrganizerService.organizerList.get({mobile: SessionService.get('mobile')}, function(result) {
    $scope.organizers = result.data;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

  ActivityService.activityForEdit.get({activity_id: $stateParams.activity_id}, function(result) {
    var activity = result.data.activity;
    $scope.activity = activity;
    $scope.poster = activity.poster;
    $scope.headerImgs = activity.headerImgs;
    $scope.footerImgs = activity.footerImgs;
    $scope.longitude1 = activity.longitude;
    $scope.latitude1 = activity.latitude;
    $scope.cityName = activity.city;
    $scope.location = activity.location;
    $scope.startTime = activity.startTime;
    $scope.isSafe = activity.isSafe;
    $scope.isEmergencyContact = activity.isEmergencyContact;
    $scope.isRealInfo = activity.isRealInfo;
    $scope.type = activity.type;

    OrganizerService.organizer.get({organizer_id: activity.organizer}, function(result) {
      if(result.data.organizer) {
        $scope.captains = result.data.organizer.captains;
      } else {
        $scope.captains = '';
      }
    }, function(error) {
      toaster.pop('error', error.data.msg);
    });

  }, function(error) {
    toaster.pop('error', error.data.msg);
  });


  $scope.captains = '';
  $scope.selectOrganize = function(organizer) {
    if(organizer) {
      for (var i = 0; i < $scope.organizers.length; i++) {
        if($scope.organizers[i]._id == organizer) {
          $scope.captains = $scope.organizers[i].captains;
        }
      };
    } else {
      $scope.captains = '';
    }
  };


  $scope.updateActivity = function(activity) {

    if(!activity.name) {
      toaster.pop('error', '请填写活动名称');
      return false;
    }
    if(!$scope.startTime) {
      toaster.pop('error', '请填写活动时间');
      return false;
    }
    if(!$scope.location) {
      toaster.pop('error', '请填写详细地址');
      return false;
    }
    if(!activity.event) {
      toaster.pop('error', '请选择活动项目');
      return false;
    }
    if(!activity.desc) {
      toaster.pop('error', '请填写活动描述');
      return false;
    }
    if(!activity.organizer) {
      toaster.pop('error', '请选择主办单位');
      return false;
    }

    activity.startTime = $scope.startTime ? new Date($scope.startTime).getTime().toString() : '';
    activity.poster = $scope.poster;
    activity.headerImgs = $scope.headerImgs;
    activity.footerImgs = $scope.footerImgs;
    activity.isSafe = $scope.isSafe;
    activity.isEmergencyContact = $scope.isEmergencyContact;
    activity.isRealInfo = $scope.isRealInfo;
    activity.type = $scope.type;
    activity.location = $scope.location;
    activity.city = $scope.cityName;
    activity.longitude = $scope.longitude1;
    activity.latitude = $scope.latitude1;

    ActivityService.updateActivity.update({activity_id: $stateParams.activity_id}, $.param(activity), function(result) {
      if(result.ret === 1) {
        $state.go('root.activity-add-group', {activity_id: result.data.activity._id});
      } else {
        toaster.pop('error', result.msg);
      }
    }, function(error) {
      toaster.pop('error', error.data.msg);
    });

  };


  $scope.upToken = '';
  QiniuService.uptoken.get({}, function(result) {
    $scope.upToken = result.data;
  });

  /**
   * 上传海报
   */
  $scope.selectPosterFiles = [];
  var startPoster = function(index) {
    $scope.selectPosterFiles[index].progress = {
      p: 0
    };
    $scope.selectPosterFiles[index].upload = $qupload.upload({
      file: $scope.selectPosterFiles[index].file,
      token: $scope.upToken
    });
    $scope.selectPosterFiles[index].upload.then(function(response) {
      //$log.info(response);
      $scope.poster = 'http://7xkwk0.com2.z0.glb.qiniucdn.com/' + response.key;
    }, function(response) {
      //$log.info(response);
    }, function(evt) {
      $scope.selectPosterFiles[index].progress.p = Math.floor(100 * evt.loaded / evt.totalSize);
    });
  };

  $scope.uploadposter = function($files) {
    var offsetx = $scope.selectPosterFiles.length;
    for (var i = 0; i < $files.length; i++) {
      $scope.selectPosterFiles[i + offsetx] = {
        file: $files[i]
      };
      startPoster(i + offsetx);
    }
  };

  /**
   * 上传头图
   */
  $scope.selectHeaderImgFiles = [];
  $scope.headerImgs = [];
  var startHeaderImgs = function(index) {
    $scope.selectHeaderImgFiles[index].progress = {
      p: 0
    };
    $scope.selectHeaderImgFiles[index].upload = $qupload.upload({
      file: $scope.selectHeaderImgFiles[index].file,
      token: $scope.upToken
    });
    $scope.selectHeaderImgFiles[index].upload.then(function(response) {
      //$log.info(response);
      $scope.headerImgs.push('http://7xkwk0.com2.z0.glb.qiniucdn.com/' + response.key);
    }, function(response) {
      //$log.info(response);
    }, function(evt) {
      $scope.selectHeaderImgFiles[index].progress.p = Math.floor(100 * evt.loaded / evt.totalSize);
    });
  };

  $scope.uploadheader = function($files) {
    if($scope.selectHeaderImgFiles.length + $files.length > 3) {
      toaster.pop('error', '上传头图不能超过3张');
    } else {
      $scope.headerImgs = [];
      var offsetx = $scope.selectHeaderImgFiles.length;
      for (var i = 0; i < $files.length; i++) {
        $scope.selectHeaderImgFiles[i + offsetx] = {
          file: $files[i]
        };
        startHeaderImgs(i + offsetx);
      }
    }
  };

  /**
   * 上传尾图
   */
  $scope.selectFooterImgFiles = [];
  $scope.footerImgs = [];
  var startFooterImgs = function(index) {
    $scope.selectFooterImgFiles[index].progress = {
      p: 0
    };
    $scope.selectFooterImgFiles[index].upload = $qupload.upload({
      file: $scope.selectFooterImgFiles[index].file,
      token: $scope.upToken
    });
    $scope.selectFooterImgFiles[index].upload.then(function(response) {
      //$log.info(response);
      $scope.footerImgs.push('http://7xkwk0.com2.z0.glb.qiniucdn.com/' + response.key);
    }, function(response) {
      //$log.info(response);
    }, function(evt) {
      $scope.selectFooterImgFiles[index].progress.p = Math.floor(100 * evt.loaded / evt.totalSize);
    });
  };

  $scope.uploadfooter = function($files) {
    if($scope.selectFooterImgFiles.length + $files.length > 3) {
      toaster.pop('error', '上传尾图不能超过3张');
    } else {
      $scope.footerImgs = [];
      var offsetx = $scope.selectFooterImgFiles.length;
      for (var i = 0; i < $files.length; i++) {
        $scope.selectFooterImgFiles[i + offsetx] = {
          file: $files[i]
        };
        startFooterImgs(i + offsetx);
      }
    }
  };


  /**
   * 上传接口
   */
  // $scope.poster = '';
  // $scope.upload = function(files) {
  //   if (files && files.length) {
  //     for (var i = 0; i < files.length; i++) {
  //       var file = files[i];
  //       Upload.upload({
  //         url: DEFAULT_DOMAIN + '/upload',
  //         method: 'POST',
  //         file: file
  //       }).progress(function(evt) {
  //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
  //       }).success(function(data, status, headers, config) {
  //         $timeout(function() {
  //           $scope.poster = '';
  //           $scope.poster = data.imgurl;
  //           // $scope.uploadLog = 'file: ' + config.fiposterle.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.uploadLog;
  //         });
  //       });
  //     }
  //   }
  // };


  // $scope.headerImgs = [];
  // $scope.uploadheader = function(files) {
  //   if(files.length > 3) {
  //     toaster.pop('error', '上传最多不能超过3张图');
  //   } else {
  //     $scope.headerImgs = [];
  //     if (files && files.length) {
  //       for (var i = 0; i < files.length; i++) {
  //         var file = files[i];
  //         Upload.upload({
  //           url: DEFAULT_DOMAIN + '/upload',
  //           method: 'POST',
  //           file: file
  //         }).progress(function(evt) {
  //           var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
  //         }).success(function(data, status, headers, config) {
  //           $timeout(function() {
  //             $scope.headerImgs.push(data.imgurl);
  //           });
  //         });
  //       }
  //     }
  //   }
  // };


  // $scope.footerImgs = [];
  // $scope.uploadfooter = function(files) {
  //   if(files.length > 3) {
  //     toaster.pop('error', '上传最多不能超过3张图');
  //   } else {
  //     $scope.footerImgs = [];
  //     if (files && files.length) {
  //       for (var i = 0; i < files.length; i++) {
  //         var file = files[i];
  //         Upload.upload({
  //           url: DEFAULT_DOMAIN + '/upload',
  //           method: 'POST',
  //           file: file
  //         }).progress(function(evt) {
  //           var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
  //         }).success(function(data, status, headers, config) {
  //           $timeout(function() {
  //             $scope.footerImgs.push(data.imgurl);
  //           });
  //         });
  //       }
  //     }
  //   }
  // };


  /**
   * 地图设置
   */
  $scope.ck = function() {
    $scope.longitude1 = 1;
  }
  $scope.stt = {
    "width": "300px",
    "height": "300px"
  };
  $scope.city = null;
  $scope.ops = {};
  $scope.longitude1 = null;
  $scope.latitude1 = null;
  $scope.location = '';
  $scope.cityName = '';

  // $scope.setCityName = function() {
  //   $scope.cityName = $("#cityNameSelect option:selected").html();
  // };

  $scope.area = function() {
    $scope.city = $scope.cityName + $scope.location;
  };

  function strtotimestamp(datestr) {
    var new_str = datestr.replace(/:/g, "-");
    new_str = new_str.replace(/ /g, "-");
    var arr = new_str.split("-");
    var datum = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));

    return (datum.getTime() / 1000); //为PHP所用
  }

}]);
