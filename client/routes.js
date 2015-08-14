(function() {
    'use strict';

    angular
        .module('gnarrly')
        .config(routingConfig);

    function routingConfig($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
          .state('parties', {
            url: '/parties',
            templateUrl: 'client/component/parties/views/parties-list.ng.html',
            controller: 'PartiesListCtrl'
          })
          .state('zoneDetails', {
            url: '/zone/:zoneId',
            templateUrl: 'client/component/zones/views/zone-details.ng.html',
            controller: 'ZoneDetailsCtrl',
            resolve: {
              "currentUser": ["$meteor", function($meteor){
                return $meteor.requireUser();
              }]
            }
          })
          .state('home', {
            url: '/',
            templateUrl: 'client/component/common/views/index.ng.html',
            controller: 'IndexCtrl',
            controllerAs: 'IdxCtrl',
            bindToController: true
          });

        $urlRouterProvider.otherwise("/");
    }
})();