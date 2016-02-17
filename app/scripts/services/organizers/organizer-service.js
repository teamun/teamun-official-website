teamunApp.factory('OrganizerService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    organizerList: $resource(DEFAULT_DOMAIN + '/site/organizers/by-mobile/:mobile', {mobile: '@mobile'}),
    organizer: $resource(DEFAULT_DOMAIN + '/site/organizers/:organizer_id', {organizer_id: '@organizer_id'}),
  };
});
