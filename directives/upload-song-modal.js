angular.module('EmphonicPlayer').directive('uploadSongModal', function() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'templates/upload-song-modal.html',
    backdrop: 'static',
    scope: {
        title: '@'
    }
  };
});
