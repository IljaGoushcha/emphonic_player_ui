angular.module('EmphonicPlayer').factory('PlaylistsFactory', function($http) {

  var allPlaylists = [];
  var playlistSongs = [];

  var fetchAll = function(){
    $http.get('http://localhost:3000/playlists').
      success(function(response) {
        console.log("successfully received all playlists");
        console.log(response);
        angular.copy(response, allPlaylists);
      }).
      error(function(data, status, headers, config) {
        console.log("something went wrong when getting playlists");
      });
  };

  var fetchPlaylistSongs = function(playlist_id) {
      // the $http API is based on the deferred/promise APIs exposed by the $q service
      // so it returns a promise for us by default
      return $http.get('http://localhost:3000/playlists/' + playlist_id)
        .then(function(response) {
          if (typeof response.data === 'object') {
            return response.data;
          } else {
            // invalid response
            return $q.reject(response.data);
          }
      }, function(response) {
        // something went wrong
        return $q.reject(response.data);
      });
  };

  return {
    fetchAll: fetchAll,
    fetchPlaylistSongs: fetchPlaylistSongs,
    allPlaylists: allPlaylists,
    playlistSongs: playlistSongs
  };

});
