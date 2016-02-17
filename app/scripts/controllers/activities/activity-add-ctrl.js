teamunApp.controller('ActivityAddCtrl', ['$scope', '$rootScope', '$state', '$location', '$stateParams', 'toaster', '$timeout', '$compile', 'Upload', '$qupload', '$log', 'QiniuService', 'ActivityService', 'EventService', 'CityService', 'OrganizerService', 'SessionService', 'DEFAULT_DOMAIN', function($scope, $rootScope, $state, $location, $stateParams, toaster, $timeout, $compile, Upload, $qupload, $log, QiniuService, ActivityService, EventService, CityService, OrganizerService, SessionService, DEFAULT_DOMAIN) {

  EventService.eventList.get({}, function(result) {
    $scope.events = result.data.events;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

  // CityService.cityList.get({}, function(result) {
  //   $scope.cities = result.data.cities;
  // }, function(error) {
  //   toaster.pop('error', error.data.msg);
  // });

  $scope.data = {
    selectedShape: '北京'
  };
  $scope.shapes = ["北京","重庆","上海","天津","长春","长沙","常州","成都","大连","东莞","佛山","福州","广州","贵阳","哈尔滨","海口","邯郸","杭州","合肥","惠州","焦作","嘉兴","吉林","济南","昆明","兰州","柳州","洛阳","南昌","南京","南宁","南通","宁波","青岛","泉州","沈阳","深圳","石家庄","苏州","台州","唐山","潍坊","威海","武汉","无锡","厦门","西安","许昌","徐州","扬州","烟台","漳州","郑州","中山","珠海","阿坝","阿克苏","阿拉善盟","阿勒泰","阿里","安康","安庆","鞍山","安顺","安阳","白城","百色","白山","白银","蚌埠","保定","宝鸡","保山","包头","巴彦淖尔","巴音郭楞","巴中","北海","本溪","毕节","滨州","博尔塔拉","亳州","沧州","常德","昌都","昌吉","长治","巢湖","朝阳","潮州","承德","郴州","赤峰","池州","崇左","楚雄","滁州","大理","丹东","大庆","大同","大兴安岭","达州","德宏","德阳","德州","定西","迪庆","东营","鄂尔多斯","恩施","鄂州","防城港","抚顺","阜阳","阜新","抚州","甘南","赣州","甘孜","广安","广元","贵港","桂林","果洛","固原","海北","海东","海南","海西","哈密","汉中","鹤壁","河池","鹤岗","黑河","衡水","衡阳","和田地","河源","菏泽","贺州","红河","淮安","淮北","怀化","淮南","黄冈","黄南","黄山","黄石","呼和浩特","葫芦岛","呼伦贝尔","湖州","佳木斯","江门","吉安","嘉峪关","揭阳","金昌","晋城","景德镇","荆门","荆州","金华","济宁","晋中","锦州","九江","酒泉","鸡西","开封","喀什地","克拉玛依","克孜勒","来宾","莱芜","廊坊","拉萨","乐山","凉山","连云港","聊城","辽阳","辽源","丽江","临沧","临汾","临夏","临沂","林芝","丽水","六安","六盘水","陇南","龙岩","娄底","漯河","泸州","吕梁","马鞍山","茂名","眉山","梅州","绵阳","牡丹江","南充","南平","南阳","那曲","内江","宁德","怒江","盘锦","攀枝花","平顶山","平凉","萍乡","普洱","莆田","濮阳","黔东","黔南","黔西南","庆阳","清远","秦皇岛","钦州","齐齐哈尔","七台河","曲靖","衢州","日喀则","日照","三门峡","三明","三亚","商洛","商丘","上饶","山南","汕头","汕尾","韶关","绍兴","邵阳","十堰","石嘴山","双鸭山","朔州","四平","松原","绥化","遂宁","随州","宿迁","宿州","塔城地","泰安","太原","泰州","天水","铁岭","铜川","通化","通辽","铜陵","铜仁","吐鲁番","渭南","文山","温州","乌海","芜湖","乌兰察布","乌鲁木齐","武威","吴忠","梧州","襄樊","湘潭","湘西","咸宁","咸阳","孝感","锡林郭勒盟","兴安盟","邢台","西宁","新乡","信阳","新余","忻州","西双版纳","宣城","雅安","延安","延边","盐城","阳江","阳泉","宜宾","宜昌","伊春","宜春","伊犁哈萨克","银川","营口","鹰潭","益阳","永州","岳阳","玉林","榆林","运城","云浮","玉树","玉溪","枣庄","张家界","张家口","张掖","湛江","肇庆","昭通","镇江","中卫","周口","舟山","驻马店","株洲","淄博","自贡","资阳","遵义","阿城","安福","安吉","安宁","安丘","安溪","安义","安远","宝应","巴彦","滨海","宾县","宾阳","璧山","博爱","博罗","博兴","苍南","苍山","曹县","长岛","长丰","长海","长乐","昌乐","常山","常熟","长泰","长汀","长兴","昌邑","潮安","呈贡","城口","成武","茌平","崇仁","崇义","崇州","淳安","慈溪","从化","枞阳","大丰","岱山","砀山","当涂","单县","丹阳","大埔","大田","大邑","大余","大足","德安","德化","德惠","登封","德清","德庆","德兴","电白","垫江","定南","定陶","定远","东阿","东海","东明","东平","东山","东台","洞头","东乡","东阳","东源","东至","都昌","都江堰","恩平","法库","繁昌","方正","肥城","肥东","肥西","费县","丰城","丰都","奉化","奉节","封开","丰顺","凤台","丰县","奉新","凤阳","分宜","佛冈","福安","福鼎","浮梁","富民","阜南","阜宁","福清","富阳","赣县","赣榆","高安","藁城","高淳","皋兰","高陵","高密","高青","高唐","高要","高邑","高邮","高州","巩义","广昌","广德","广丰","广宁","广饶","光泽","灌南","冠县","灌云","贵溪","古田","固镇","海安","海丰","海门","海宁","海盐","海阳","含山","合川","横峰","横县","和平","鹤山","和县","洪泽","华安","桦甸","怀集","怀宁","怀远","桓台","化州","惠安","会昌","惠东","惠来","惠民","湖口","呼兰","霍邱","霍山","户县","建德","江都","江津","将乐","江山","姜堰","江阴","建湖","建宁","建瓯","建阳","吉安","蛟河","蕉岭","胶南","胶州","嘉善","嘉祥","揭东","界首","揭西","即墨","靖安","旌德","井冈山","靖江","景宁","泾县","井陉","金湖","晋江","金门","晋宁","金坛","金堂","进贤","金溪","金乡","缙云","金寨","晋州","吉水","九江","九台","绩溪","济阳","济源","鄄城","莒南","句容","莒县","巨野","开化","开平","开县","开阳","康平","垦利","昆山","来安","莱西","莱阳","莱州","郎溪","蓝田","兰溪","乐安","乐昌","雷州","乐陵","乐平","乐清","乐亭","连城","梁平","梁山","莲花","连江","廉江","连南","连平","连山","涟水","连州","辽中","黎川","利津","临安","灵璧","灵寿","陵县","临海","临清","临泉","临朐","临沭","临邑","溧水","柳城","柳江","浏阳","利辛","溧阳","隆安","龙川","龙海","龙口","龙门","龙南","龙泉","龙游","栾城","栾川","滦南","滦县","陆丰","陆河","庐江","罗定","洛宁","罗源","鹿泉","禄劝","芦溪","鹿寨","马山","梅县","蒙城","孟津","蒙阴","孟州","明光","明溪","闽侯","闽清","木兰","南安","南澳","南城","南川","南丰","南靖","南康","南陵","南雄","宁都","宁国","宁海","宁化","宁津","宁乡","宁阳","农安","磐安","磐石","沛县","蓬莱","彭水","彭泽","彭州","平度","平和","平湖","屏南","平山","平潭","平阳","平阴","平邑","平原","平远","郫县","邳州","鄱阳","浦城","浦江","蒲江","普兰店","普宁","迁安","潜山","铅山","迁西","启东","齐河","綦江","祁门","清流","青田","清新","青阳","庆元","庆云","清镇","青州","沁阳","邛崃","栖霞","全椒","全南","曲阜","曲江","饶平","仁化","融安","荣昌","荣成","融水","如东","如皋","瑞安","瑞昌","瑞金","乳山","汝阳","乳源","三江","三门","诏安","上高","上杭","商河","上栗","上林","上饶","上犹","上虞","尚志","邵武","绍兴","沙县","嵊泗","嵊州","莘县","深泽","歙县","射阳","石城","石林","石狮","石台","始兴","石柱","寿光","寿宁","寿县","双城","双流","舒城","舒兰","顺昌","沭阳","泗洪","四会","泗水","泗县","泗阳","嵩明","松溪","嵩县","松阳","遂昌","遂川","睢宁","濉溪","遂溪","宿松","宿豫","太仓","太和","泰和","太湖","泰宁","台山","泰顺","泰兴","郯城","唐海","滕州","天长","天台","桐城","铜鼓","通河","铜梁","铜陵","桐庐","潼南","铜山","桐乡","通州","瓦房店","万安","望城","望江","万年","万载","微山","文成","文登","翁源","温岭","汶上","温县","涡阳","五常","武城","吴川","无棣","五河","芜湖","五华","无极","吴江","五莲","武隆","武鸣","武宁","武平","巫山","无为","巫溪","武义","武夷山","婺源","武陟","峡江","夏津","象山","响水","仙居","仙游","萧县","霞浦","息烽","新安","新昌","信丰","新丰","新干","兴国","兴化","兴宁","行唐","荥阳","星子","辛集","新建","新津","新乐","新民","新密","新泰","新兴","新沂","信宜","新郑","休宁","秀山","修水","修文","修武","寻甸","寻乌","徐闻","盱眙","阳春","阳东","阳谷","阳山","阳信","阳西","扬中","偃师","延寿","兖州","伊川","宜丰","宜黄","依兰","宜良","沂南","英德","颍上","沂水","义乌","黟县","宜兴","弋阳","宜阳","沂源","仪征","永安","永川","永春","永登","永定","永丰","永吉","永嘉","永康","邕宁","永泰","永新","永修","尤溪","酉阳","元氏","禹城","于都","岳西","余干","玉环","余江","郁南","云安","郓城","云和","云霄","云阳","玉山","榆树","鱼台","玉田","余姚","榆中","赞皇","增城","张家港","漳平","漳浦","章丘","樟树","沾化","赵县","招远","正定","政和","柘荣","中牟","忠县","周宁","周至","庄河","诸城","诸暨","紫金","资溪","邹城","邹平","遵化"];
  
  OrganizerService.organizerList.get({mobile: SessionService.get('mobile')}, function(result) {
    $scope.organizers = result.data;
  }, function(error) {
    toaster.pop('error', error.data.msg);
  });

  //限制活动开始时间不能小于今天
  $scope.today = new Date();
  $scope.yesterday = new Date($scope.today);
  $scope.yesterday.setDate($scope.today.getDate() - 1);

  $scope.saveActivity = function(activity) {

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

    var startTime = $scope.startTime ? $scope.startTime.getTime() : '';

    activity.startTime = startTime;
    activity.poster = $scope.poster;
    activity.headerImgs = $scope.headerImgs;
    activity.footerImgs = $scope.footerImgs;
    activity.isSafe = $scope.isSafe;
    activity.isEmergencyContact = $scope.isEmergencyContact;
    activity.isRealInfo = $scope.isRealInfo;
    activity.type = $scope.type;
    activity.location = $scope.location;
    // activity.city = $scope.cityName.name;
    activity.city = $scope.data.selectedShape;
    activity.longitude = $scope.longitude1;
    activity.latitude = $scope.latitude1;
    if(activity.organizer) activity.organizer = activity.organizer._id;

    ActivityService.saveActivity.save($.param(activity), function(result) {
      if (result.ret === 1) {
        toaster.pop('success', '创建成功！');
        // $state.go('root.activity-add-group', {activity_id: result.data.activity._id});
        $location.path('activity-add-group/' + result.data.activity._id);
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
  //           $scope.headerImgs.push(data.imgurl);
  //         });
  //       });
  //     }
  //   }
  // };


  // $scope.footerImgs = [];
  // $scope.uploadfooter = function(files) {
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
  //           $scope.footerImgs.push(data.imgurl);
  //         });
  //       });
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
    $scope.city = $scope.data.selectedShape + $scope.location;
  };

  $scope.isSafe = false;
  $scope.isEmergencyContact = false;
  $scope.isRealInfo = false;
  $scope.type = '0';
  // $scope.paymentWay = 'online';
  // $scope.isFree = true;
  // $scope.numLimit = 0;

  function strtotimestamp(datestr) {
    var new_str = datestr.replace(/:/g, "-");
    new_str = new_str.replace(/ /g, "-");
    var arr = new_str.split("-");
    var datum = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));

    return (datum.getTime() / 1000); //为PHP所用
  }




















}]);