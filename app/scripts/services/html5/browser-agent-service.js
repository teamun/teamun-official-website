teamunApp.factory('BrowserAgentService', function() {
  return {
    isAndroidBrowser:/android/i.test(navigator.userAgent),
    isAppleMobileBrowser:/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent),
    isTeamunAppWebView:/Teamun/i.test(navigator.userAgent),
  };
});
