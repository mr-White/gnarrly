/**
 * Module Declaration
 */
angular.module('gnarrly',[
  'angular-meteor',
  'ngAnimate',
  'ui.router',
  'angularUtils.directives.dirPagination',
  'uiGmapgoogle-maps',
  // 'ngMaterial',
  'ngFileUpload',
  'ngImgCrop',
  'xeditable',
  'angular-sortable-view',
  'ui.bootstrap'
]);

/**
 * Start Angular App when device is Ready
 */
function onReady() {
  angular.bootstrap(document, ['gnarrly']);
}

/**
 * Wait for document to bootstrap app
 *  - For mobile support
 */
if (Meteor.isCordova) {
  angular.element(document).on("deviceready", onReady);
}
else {
  angular.element(document).ready(onReady);
}

