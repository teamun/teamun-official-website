teamunApp.factory('OfficialActionService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    action: $resource(DEFAULT_DOMAIN + '/site/official-actions/:action_id', {action_id: '@action_id'}),
    join: $resource(DEFAULT_DOMAIN + '/site/recruit-groups/join/:recruit_group_id', {recruit_group_id: '@recruit_group_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
    quit: $resource(DEFAULT_DOMAIN + '/site/recruit-groups/quit/:recruit_group_id', {recruit_group_id: '@recruit_group_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
    groupmembers: $resource(DEFAULT_DOMAIN + '/site/recruit-groups/members/:action_id', {action_id: '@action_id'}),    

  };
});
