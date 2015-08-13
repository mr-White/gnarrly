angular.module("gnarrly").controller("IndexCtrl", 
  ['$scope', '$meteor', '$rootScope', '$state', '$mdDialog', '$filter', 'uiGmapIsReady', '$timeout',
  function($scope, $meteor, $rootScope, $state, $mdDialog, $filter, uiGmapIsReady, $timeout){

    var vm = this;

    vm.initialPageLoading = true;

    // On google map is ready, show the ui controls
    uiGmapIsReady.promise(1).then(function(instances) {
        $timeout(function(){
          vm.initialPageLoading = false;
        },1500);
    });

    $scope.page = 1;
    $scope.perPage = 3;
    $scope.sort = { name: 1 };
    $scope.orderProperty = '1';

    $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
    $scope.images = $meteor.collectionFS(Images, false, Images).subscribe('images');
    
    // $rootScope.$watch('currentUser', function(newValue, oldValue) {
    //   if (newValue !== oldValue) {
    //     console.log('user: ',newValue);
    //   }
    // });

    // $scope.zones = $meteor.collection(function() {
    //   return Zones.find({}, {
    //     sort : $scope.getReactively('sort')
    //   });
    // });

    
    $meteor.subscribe('zones', {
      limit: parseInt($scope.getReactively('perPage')),
      skip: (parseInt($scope.getReactively('page')) - 1) * parseInt($scope.getReactively('perPage')),
      sort: $scope.getReactively('sort')
    }).then(function(zonesHandle) {
      // Zones
      $scope.zones = $meteor.collection(Zones);
      // $scope.zonesCount = $meteor.object(Counts ,'numberOfZones', false);

      // Setup click events
      $scope.zones.forEach( function (zone) {
        zone.onClicked = function () {
          $state.go('zoneDetails', {zoneId: zone._id});
        };
      });

      // Map Style - needs to go in map service
      var styleArray = [
        {
          featureType: "all",
          stylers: [
            { saturation: -80 }
          ]
        },{
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [
            { hue: "#00ffee" },
            { saturation: 50 }
          ]
        },{
          featureType: "poi.business",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        }
      ];

      // Map default coordinates, zoom, --- again map service
      $scope.map = {
        center: {
          latitude: 45,
          longitude: -73
        },
        zoom: 8,
        options: {
          styles: styleArray
        }
      };
    });
    

    $scope.remove = function(party){
      $scope.zones.splice( $scope.zones.indexOf(party), 1 );
    };

    $scope.updateDescription = function($data, image) {
      image.update({$set: {'metadata.description': $data}});
    };

    $scope.openAddImageModal = function() {
      $mdDialog.show({
        controller: 'AddPhotoCtrl',
        templateUrl: 'client/parties/views/add-photo-modal.ng.html',
        scope: $scope.$new(),
        locals: {
          newOrder: $scope.newPartyImages ? $scope.newPartyImages.length : 0
        },
        parent: angular.element(document.body)
      }).then(function(image) {
        if (image) {
          if (!$scope.newPartyImages) {
            $scope.newPartyImages = [];
          }
          $scope.newPartyImages.push(image);
        }
      })
    };

    $scope.updateOrder = function(sortedArr) {
      angular.forEach(sortedArr, function(item, index) {
        item.currentOrder = index;
      })
    };

    $scope.createParty = function() {
      $scope.newParty.owner = $rootScope.currentUser._id;

      if ($scope.newPartyImages && $scope.newPartyImages.length > 0) {
        $scope.newParty.images = [];

        angular.forEach($scope.newPartyImages, function(image) {
          $scope.newParty.images.push({id: image._id, order: image.currentOrder})
        });
      }

      $scope.zones.push($scope.newParty);
      $scope.newPartyImages = [];
      $scope.newParty = {};
    };

    $scope.getMainImage = function(images) {
      var mainImage = $filter('filter')(images, {order: 0})[0];

      if (mainImage) {
        return $filter('filter')($scope.images, {_id: mainImage.id})[0].url();
      }
    };

    $scope.pageChanged = function(newPage) {
      $scope.page = newPage;
    };

    $scope.$watch('orderProperty', function(){
      if ($scope.orderProperty)
        $scope.sort = {name: parseInt($scope.orderProperty)};
    });

    $scope.getUserById = function(userId){
      return Meteor.users.findOne(userId);
    };

    $scope.creator = function(zone){
      if (!zone)
        return;
      var owner = $scope.getUserById(zone.owner);
      if (!owner)
        return "nobody";

      if ($rootScope.currentUser)
        if ($rootScope.currentUser._id)
          if (owner._id === $rootScope.currentUser._id)
            return "me";

      return owner;
    };

    // convert this into check-in
    $scope.rsvp = function(zoneId, rsvp){
      $meteor.call('rsvp', zoneId, rsvp).then(
        function(data){
          console.log('success responding', data);
        },
        function(err){
          console.log('failed', err);
        }
      );
    };
}]);