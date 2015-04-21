angular.module('EmphonicPlayer').factory('SongsFactory', function($http, $q) {

  var songs = [];
  var playlistSongs = [];

  var fetch = function(){
    $http.get('https://emphonic-rails-api.herokuapp.com/songs').success(function(response){
      console.log(response);
      angular.copy(response, songs);
    });
  };
  var fetchPlaylistSongs = function(playlist_name) {
    // the $http API is based on the deferred/promise APIs exposed by the $q service
    // so it returns a promise for us by default
    return $http.get('https://emphonic-rails-api.herokuapp.com/playlists/get_playlist_songs/' + playlist_name)
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
    songs: songs,
    playlistSongs: playlistSongs
  };
});
