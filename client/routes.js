angular.module("gnarrly").run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$stateChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === "AUTH_REQUIRED") {
      $location.path("/parties");
    }
  });
}]);

angular.module("gnarrly").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

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
        templateUrl: 'client/component/common/index.ng.html',
        controller: 'IndexCtrl',
        controllerAs: 'IdxCtrl',
        bindToController: true
      });

    $urlRouterProvider.otherwise("/");
  }]);