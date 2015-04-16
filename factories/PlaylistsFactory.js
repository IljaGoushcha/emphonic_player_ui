angular.module('EmphonicPlayer').factory('PlaylistsFactory', function($http) {

  var playlists = [];

  var fetch = function(){
    $http.get('http://localhost:3000/playlists').success(function(response){
      console.log(response);
      angular.copy(response, playlists);
    });
  };

  return {
    fetch:fetch,
    playlists:playlists
  };
});
