teamunApp.factory('TeamunNativeAppService', ['$q', 'BrowserAgentService', function($q, BrowserAgentService) {
    if(BrowserAgentService.isAppleMobileBrowser){
        var connectWebViewJavascriptBridge = function(callback) {
            if (window.WebViewJavascriptBridge) {
                callback(WebViewJavascriptBridge);
            } else {
                document.addEventListener('WebViewJavascriptBridgeReady', function() {callback(WebViewJavascriptBridge);}, false);
            };
        };

        var jsBridge;

        connectWebViewJavascriptBridge(function(bridge) {
            bridge.init(function(message, responseCallback) {
                var data = { 'Javascript Responds':'Wee!' };
                responseCallback(data);
            });

            jsBridge = bridge;
        });
    };
    return {
        invokeNativeFunction:function(nativeMethod){
            var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行 

            if (BrowserAgentService.isTeamunAppWebView) {
                if (BrowserAgentService.isAndroidBrowser) {
                    deferred.resolve(angular.fromJson(local[nativeMethod]()));  // 声明执行成功，即调用本地app方法请求数据成功，可以返回数据了  
                } else if(BrowserAgentService.isAppleMobileBrowser){

                    //并调用native app方法
                    jsBridge.callHandler(nativeMethod, {}, function(response) {
                        deferred.resolve(angular.fromJson(response));  // 声明执行成功，即http请求数据成功，可以返回数据了  
                    });
                }else{
                    deferred.resolve(undefined);  
                };

            };
            return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API  
        }
    };
}]);
