/**
 * layoutCtrl
 * 	Init layout default values etc.
 * 	Store data in layoutService so other controllers/directives can access
 */

(function() {
    'use strict';

    angular
        .module('gnarrly')
        .controller('layoutController', layoutController);

    function layoutController(mapService, $timeout) {
        var vm = this;

        // After the map loads, the ovrlayed UI 
        // waits this long before appearing
        var uiLoadDelay = 1500; // milli-seconds

        activate();

        ////////////////

        function activate() {
        	// Setup Layout
        	setupMapLoading();
        }

        function setupMapLoading() {
        	// Map is loading
        	vm.mapsLoading = true;

        	// We use the map service to get a promise for when the map is ready
        	mapService.mapReady().then(function(instances) {
        		// After timeout we set loading to false
		        $timeout(function(){
		          vm.mapsLoading = false;
		        }, uiLoadDelay);
		    });
        }
    }
})();