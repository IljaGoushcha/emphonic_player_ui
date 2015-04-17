angular.module('EmphonicPlayer', ['mediaPlayer']);

angular.module('EmphonicPlayer').run(function(SongsFactory, PlaylistsFactory){
    SongsFactory.fetch();
    PlaylistsFactory.fetch();
});

angular.module('EmphonicPlayer').controller('MainCtrl', function($scope, $http, SongsFactory, PlaylistsFactory, AmazonService) {
    'use strict';

    $scope.songs = SongsFactory.songs;
    $scope.orderedPlaylists = PlaylistsFactory.orderedPlaylists;

    // $scope.play_list = [
    //     { src: 'https://s3.amazonaws.com/emphonic-player-demo/uploads/1043ceee-c81d-458c-a9ac-f2aede40d93e', type: 'audio/ogg' },
    //     { src: 'https://s3.amazonaws.com/emphonic-player-demo/uploads/97999ab8-8cca-4fa2-a324-207b6defbd98', type: 'audio/ogg' }
    // ];

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

    $scope.uploadToS3 = function() {
        console.log("inside uploadToS3()");
        var amazonSignKey = {};
        var file = $scope.myAudioFile;
        var title = $scope.song.title;
        var author = $scope.song.author;
        var album = $scope.song.album;
        var playlist = $scope.song.playlist;

        var makePromiseWithRailsAPI = function() {
            console.log("inside makePromiseWithRailsAPI");
            // This service's function returns a promise, but we'll deal with that shortly
            AmazonService.getKey()
                // then() called when son gets back
                .then(function(data) {
                    amazonSignKey = data;
                    console.log(data);
                    AmazonService.sendToS3(amazonSignKey, file, title, author, album, playlist);
                }, function(error) {
                    // promise rejected, could log the error with: console.log('error', error);
                    console.log(error);
                });
        };

        makePromiseWithRailsAPI();
    }

});


