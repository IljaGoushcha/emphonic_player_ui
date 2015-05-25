angular.module('EmphonicPlayer').factory('PlaylistFoldersFactory', function($http) {

  var playlistFolders = [];

  var fetch = function(){
    $http.get('http://localhost:3000/playlist_folders').
      success(function(response){
        console.log("successfully received all playlist_folders");
        console.log(response);
        angular.copy(response, playlistFolders);
      }).
      error(function(data, status, headers, config){
        console.log("something went wrong when getting playlist_folders");
      });
  };

  return {
    fetch: fetch,
    playlistFolders: playlistFolders
  };

});
