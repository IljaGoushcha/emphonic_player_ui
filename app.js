angular.module('EmphonicPlayer', ['mediaPlayer'])

angular.module('EmphonicPlayer').run(function(SongsFactory){
    SongsFactory.fetch();

});

angular.module('EmphonicPlayer').directive('uploadModal', function() {
  return {
    restrict: 'E',

    transclude: true,

    templateUrl: 'templates/upload-track-modal.html',

    scope: {
        title: '@'
    },
  };
});

angular.module('EmphonicPlayer').controller('MainCtrl', function($scope, $http, SongsFactory) {
    'use strict';

    $scope.songs = SongsFactory.songs;

    $scope.play_list = [
        { src: 'https://s3.amazonaws.com/emphonic-player-demo/uploads/1043ceee-c81d-458c-a9ac-f2aede40d93e', type: 'audio/ogg' },
        { src: 'https://s3.amazonaws.com/emphonic-player-demo/uploads/97999ab8-8cca-4fa2-a324-207b6defbd98', type: 'audio/ogg' }
    ];

    var x = 1.0;

    var audioElm = document.getElementById("audio1"); // Audio element
    var ratedisplay = document.getElementById("rate"); // Rate display area

    $scope.setCurrentSong = function(song) {
        $scope.current_song = song;
        console.log("in setCurrentSong");
    };

    $scope.playButton = function () {

        $scope.audio1.playPause();
    };

    $scope.nextTrack = function () {
        console.log("inside nextSong");
        $scope.audio1.next();
    };

    $scope.speedUp = function () {
        x = x + 0.1;
        $scope.audio1.setPlaybackRate(x);
        console.log(x);
    };

    $scope.slowDown = function () {
        x = x - 0.1;
        $scope.audio1.setPlaybackRate(x);
        console.log(x);
    };

    $scope.resetSpeed = function () {
        x = 1.0;
        $scope.audio1.setPlaybackRate(x);
        console.log(x);
    };

    $scope.getAmazonURL = function() {
        console.log("inside getAmazonURL");
        $http.get('http://localhost:3000/amazon/sign_key').success(function(response){
            $scope.response = response;
            console.log(response.key);
            // debugger;
        }).error(function(data, status, headers, config){
            console.log(data);
            console.log(status);
            console.log("error");
        });
    };

    $scope.uploadFile = function() {
      data = {
        "acl" : $scope.response.acl,
        "key" : $scope.response.key,
        "AWSAccessKeyId" : $scope.response.access_key,
        "Policy" : $scope.response.policy,
        "Signature" : $scope.response.signature
      };
      $http.post('http://emphonic-player-demo.s3.amazonaws.com/', data);
      // $.ajax({
      //   url: 'https://emphonic-player-demo/songs',
      //   type: 'POST',
      //   data: {song: {file_name: 'placeholder', image_file: 'placeholder', image_url: key, flag: '0', image_set_id: '1'}}
      // }).done(function(response) {
      //   console.table(response);
      // });
    }

});

// angular.module('EmphonicPlayer').directive('uploadModal', function() {
//     return {
//         restrict: 'E',

//         transclude: true,

//         templateUrl: 'templates/upload-modal.html',

//         scope: {
//             title: '@'
//         }
//     };
// });

