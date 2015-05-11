angular.module('EmphonicPlayer').factory('PlaylistsFactory', function($http, $q) {

  var playlists = [];
  var playlistSongs = [];

  var fetch = function(){
    $http.get('http://localhost:3000/playlists').success(function(response){
      console.log(response);
      angular.copy(response, playlists);
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
  // fetchPlaylistSongs: function(playlist_name){
  //   var playlisSongsPromise = $http.get('http://localhost:3000/playlists/get_playlist_songs/' + playlist_name)
  //   .success(function(response){
  //     console.log(response);
  //     angular.copy(response, playlistSongs);
  //   });
  //   return playlisSongsPromise;
  // };

  return {
    fetch: fetch,
    fetchPlaylistSongs: fetchPlaylistSongs,
    playlists: playlists,
    playlistSongs: playlistSongs
  };
});
