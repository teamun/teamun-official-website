teamunApp.factory('TeamunNativeAppService', function(BrowserAgentService) {
    return {
        invokeNativeFunction:function(nativeMethod){
            if (BrowserAgentService.isTeamunAppWebView) {
                if (BrowserAgentService.isAndroidBrowser) {
                    return angular.fromJson(local[nativeMethod]());
                } else if(BrowserAgentService.isAppleMobileBrowser){
                    var connectWebViewJavascriptBridge = function(callback) {
                        if (window.WebViewJavascriptBridge) {
                            callback(WebViewJavascriptBridge);
                        } else {
                            document.addEventListener('WebViewJavascriptBridgeReady', function() {callback(WebViewJavascriptBridge);}, false);
                        }
                    }

                    connectWebViewJavascriptBridge(function(bridge) {
                        bridge.init(function(message, responseCallback) {
                            var data = { 'Javascript Responds':'Wee!' };
                            responseCallback(data);
                        });

                        //并调用native app方法获取token, mobile, nickname
                        bridge.callHandler(nativeMethod, {}, function(response) {
                            //返回当前用户
                            return angular.fromJson(response);
                        });

                    });
                    return undefined;
                };
            };
        }
    };
});
