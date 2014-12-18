angular.module('EmphonicPlayer').factory('SongsFactory', function($http){

  var songs = [];

  var fetch = function(){
    $http.get('http://localhost:3000/songs').success(function(response){
      console.log("hi!!!!!");
      console.log(response);
      angular.copy(response, songs);
    });
  };

  return {
    fetch:fetch,
    songs:songs
  };
});
