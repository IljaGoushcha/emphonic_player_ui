angular.module('EmphonicPlayer').directive('openPlaylistModal', function() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'templates/open-playlist-modal.html',
    backdrop: 'static',
    scope: {
        title: '@'
    }
  };
});
