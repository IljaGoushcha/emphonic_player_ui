angular.module('EmphonicPlayer').directive('renameFolderModal', function() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'templates/rename-folder-modal.html',
    backdrop: 'static',
    scope: {
        title: '@'
    }
  };
});
