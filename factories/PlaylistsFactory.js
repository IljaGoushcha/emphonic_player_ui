angular.module('EmphonicPlayer').factory('PlaylistsFactory', function($http) {

  var playlists = [];
  var orderedPlaylists = [];

  var fetch = function(){
    $http.get('https://emphonic-rails-api.herokuapp.com/playlists').success(function(response){
      console.log(response);
      angular.copy(response, playlists);
      for (var i = 1; i < 26; i++) {
        var tempObj = {};
        for (var j = 0; j < playlists.length; j++) {
          if (playlists[j]["cell"] == i) {
            tempObj["name"] = playlists[j]["name"];
            tempObj["cell"] = i;
            break;
          } else {
            tempObj["name"] = "";
            tempObj["cell"] = i;
          }
        }
        orderedPlaylists.push(tempObj);
      }
    });
  };

  return {
    fetch:fetch,
    playlists:playlists,
    orderedPlaylists:orderedPlaylists
  };
});
