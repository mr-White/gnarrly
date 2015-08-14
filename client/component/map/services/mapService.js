/**
 * Map Service
 * 	Handles events related to map (mapReady)
 */

(function() {
    'use strict';

    angular
        .module('gnarrly')
        .factory('mapService', mapService);

    function mapService(uiGmapIsReady) {
        var service = {
            mapReady: mapReady
        };
        return service;

        ////////////////
        
        function mapReady() {
        	return uiGmapIsReady.promise(1);
        }

    }
})();