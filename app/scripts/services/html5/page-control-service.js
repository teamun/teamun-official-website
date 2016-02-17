teamunApp.factory('PageControlService', ['$rootScope', 
	function($rootScope) {
		//此处使用rootScope以保证在webview中其他页面也隐藏头部
	    if(typeof $rootScope.pageStructureConfig == 'undefined'){
	      $rootScope.pageStructureConfig = {};
	    }

	    //取消正文部分边框效果
	    if(typeof $rootScope.pageClassConfig == 'undefined'){
	      $rootScope.pageClassConfig = {};
	    }

		return {
			hideStructure:function(structures){
				var s;
				for (var i = structures.length - 1; i >= 0; i--) {
					s = structures[i];
					s = 'hide' + s.substring(0,1).toUpperCase() + s.substring(1) + 'Flag';
					$rootScope.pageStructureConfig[s] = true;
				};
			},
			hideCssClass:function(classes){
				var c;
				for (var i = classes.length - 1; i >= 0; i--) {
					c = classes[i];
					c = 'hide' + c.substring(0,1).toUpperCase() + c.substring(1) + 'Class';
					$rootScope.pageClassConfig[c] = true;
				};
			}
		};
}]);