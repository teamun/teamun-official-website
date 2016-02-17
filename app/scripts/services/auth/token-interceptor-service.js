teamunApp.factory('TokenInterceptorService', function($q, AuthenticationService) {
  return {
    request: function(config) {

      //判断是否包含七牛上传upload_token，如果包含修改headers authorization 参数，不然会被每次请求自己服务器的token冲掉。
      if(config.headers.Authorization) {
        if(config.headers.Authorization.indexOf('UpToken') != -1){
          config.headers = config.headers || {};
          if (localStorage.token) {
            config.headers.Authorization = config.headers.Authorization;
          }
          return config;
        }
      } else {
        config.headers = config.headers || {};
        //fix bug by lujilin 2016-02-02 16:51,修复在安卓webview中localStorage为空时空指针问题
        //fix bug by lujilin 2016-02-03 19:30,<2016-02-02 16:51,修复在安卓webview中localStorage为空时空指针问题> 此问题是因为webview没有开启localStorage功能导致，非前端代码问题
        if (localStorage.token) {
          config.headers.authorization = localStorage.token;
        }
        return config;
      }
    },

    response: function(response) {
      return response || $q.when(response);
    }
  };
});
