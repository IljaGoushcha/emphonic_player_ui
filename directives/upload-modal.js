angular.module('EmphonicPlayer').directive('uploadModal', function() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'templates/upload-track-modal.html',
    backdrop: 'static',
    keyboard: false,
    scope: {
        title: '@'
    }
  };
});
