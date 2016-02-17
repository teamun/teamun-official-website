teamunApp.directive('baiduMap', function() {
    var defaultOps = {
      "level": 15,
      "scroll": true,
      "showControl": true,
      "zoomControl": true
    };

    function checkNull(obj) {
      return obj === null || obj === undefined;
    }
    return {
      restrict: 'EA',
      transclude: true,
      replace: false,
      template: '<div ng-style="mapStyle"></div>',
      scope: {
        mapStyle: '=?',
        longitude: '=?',
        latitude: '=?',
        city: '=?',
        mapOptions: '=?',
      },
      link: function(scope, element, attrs, controller) {

        var ops = {};
        if (scope.mapOptions) {
          ops.level = checkNull(scope.mapOptions.level) ? defaultOps.level : scope.mapOptions.level;
          ops.showControl = checkNull(scope.mapOptions.showControl) ? defaultOps.showControl : scope.mapOptions.showControl;
          ops.zoomControl = checkNull(scope.mapOptions.zoomControl) ? defaultOps.zoomControl : scope.mapOptions.zoomControl;
        } else {
          ops = defaultOps;
        }

        var longitude = scope.longitude ? scope.longitude : 116.404;
        var latitude = scope.latitude ? scope.latitude : 39.915;
        var city = scope.city;

        scope.map = new BMap.Map(element.find('div')[0]);

        scope.map.centerAndZoom(new BMap.Point(longitude, latitude), ops.level);
        if (ops.showControl) {
          scope.map.addControl(new BMap.MapTypeControl());
        }

        //scope.map.setCurrentCity(city);
        scope.map.enableScrollWheelZoom(ops.scroll);
        if (ops.zoomControl) {
          scope.map.addControl(new BMap.NavigationControl());
        }

        scope.myGeo = new BMap.Geocoder();

        scope.map.addEventListener("click", function(e) {
          if (scope.maker) {
            scope.maker.hide();
          }
          scope.maker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat));

          scope.map.addOverlay(scope.maker);

          scope.$apply(function() {
            scope.longitude = e.point.lng;
            scope.latitude = e.point.lat;
          });

        });

        scope.$watch('city', function() {
          //map.centerAndZoom(scope.city,ops.level);
          scope.myGeo.getPoint(scope.city, function(point) {
            if (point) {
              scope.map.centerAndZoom(point, 15);
              scope.map.addOverlay(new BMap.Marker(point));
              scope.$apply(function() {
                scope.longitude = point.lng;
                scope.latitude = point.lat;
              });
            }
          })
        });

      }
    }
  });
