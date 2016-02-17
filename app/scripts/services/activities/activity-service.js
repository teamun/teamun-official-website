teamunApp.factory('ActivityService', function($resource, $location, DEFAULT_DOMAIN) {
  return {
    activityList: $resource(DEFAULT_DOMAIN + '/site/activities', {page: '@page', city: '@city'}),
    activity: $resource(DEFAULT_DOMAIN + '/site/activities/:activity_id', {activity_id: '@activity_id'}),
    activityForEdit: $resource(DEFAULT_DOMAIN + '/site/activities/:activity_id/edit', {activity_id: '@activity_id'}),
    saveActivity: $resource(DEFAULT_DOMAIN + '/site/activities', {}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }),
    updateActivity: $resource(DEFAULT_DOMAIN + '/site/activities/:activity_id', {activity_id: '@activity_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
    publishActivity: $resource(DEFAULT_DOMAIN + '/site/activities/:activity_id/publish', {activity_id: '@activity_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),


    saveActivityGroup: $resource(DEFAULT_DOMAIN + '/site/activity-groups', {}, {
      save: {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }),
    activityGroups: $resource(DEFAULT_DOMAIN + '/site/activity-groups/:activity_id', {activity_id: '@activity_id'}),
    activityGroupForEdit: $resource(DEFAULT_DOMAIN + '/site/activity-groups/:activity_group_id/edit', {activity_group_id: '@activity_group_id'}),
    updateActivityGroup: $resource(DEFAULT_DOMAIN + '/site/activity-groups/:activity_group_id', {activity_group_id: '@activity_group_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
    removeActivityGroup: $resource(DEFAULT_DOMAIN + '/site/activity-groups/:activity_group_id', {activity_group_id: '@activity_group_id'}, {
      remove: {
        method: "DELETE"
      }
    }),



    join: $resource(DEFAULT_DOMAIN + '/site/activity-groups/join/:activity_group_id', {activity_group_id: '@activity_group_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
    quit: $resource(DEFAULT_DOMAIN + '/site/activity-groups/quit/:activity_group_id', {activity_group_id: '@activity_group_id'}, {
      update: {
        method: "PUT",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    }),
    groupmembers: $resource(DEFAULT_DOMAIN + '/site/activity-groups/members/:activity_id', {activity_id: '@activity_id'}),

  };
});
