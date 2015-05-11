angular.module('EmphonicPlayer', ['mediaPlayer']);

angular.module('EmphonicPlayer').run(function(SongsFactory, PlaylistFoldersFactory){
    // SongsFactory.fetch();
    PlaylistFoldersFactory.fetch();
});

angular.module('EmphonicPlayer').controller('MainCtrl', function($scope, $http, SongsFactory, PlaylistFoldersFactory, AmazonService) {
    'use strict';

    $scope.railsApiUrl = "https://emphonic-rails-api.herokuapp.com/";
    $scope.audioPlaylist = [];
    $scope.audioPlaylistDisplay = [];
    $scope.playlistIndex = 0;
    $scope.playlistFolders = PlaylistFoldersFactory.playlistFolders;
    $scope.openedPlaylistSongs = [];
    $scope.openedPlaylist;
    $scope.showPlaylistFolders = true;
    $scope.showPlaylistPage = false;
    $scope.showPlayButton = true;
    $scope.showPauseButton = false;
    $scope.playlistFoldersPage = 1;
            // { src: 'https://s3.amazonaws.com/emphonic-player-demo/uploads/64b4d8c2-574c-4284-9c6b-6fe2810ae3c6', type: 'audio/ogg' },
            // { src: 'https://s3.amazonaws.com/emphonic-player-demo/uploads/92f3eafe-afb4-4abb-a80a-bb33cd328c76', type: 'audio/ogg' }





    var x = 1.0;

    var audioElm = document.getElementById("audio1"); // Audio element
    var ratedisplay = document.getElementById("rate"); // Rate display area


    $scope.setCurrentSong = function(song) {
        $scope.current_song = song;
        console.log("in setCurrentSong");
    };

    $scope.playButton = function () {
        if ($scope.showPlayButton == true && $scope.showPauseButton == false) {
            $scope.showPlayButton = false;
            $scope.showPauseButton = true;
        } else {
            $scope.showPlayButton = true;
            $scope.showPauseButton = false;
        }

        $scope.audio1.playPause();
    };

    $scope.nextTrack = function () {
        console.log("inside nextSong");
        $scope.audio1.next();
    };

    $scope.previousTrack = function () {
        console.log("inside previousSong");
        $scope.audio1.prev();
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
    };

    $scope.openPlaylist = function(n, playlist) {
        console.log("inside setOpenedPlaylist(), cell: " + n + ", playlist: " + playlist);
        SongsFactory.fetchPlaylistSongs(playlist)
            .then(function(data) {
                $scope.openedPlaylistSongs = data;
                $scope.showPlaylistsPage = false;
                $scope.showPlaylistPage = true;
            }, function(error) {
                // promise rejected, could log the error with: console.log('error', error);
                console.log(error);
            });
        $scope.openedPlaylist = playlist;
    };

    $scope.closePlaylist = function() {
        $scope.showPlaylistsPage = true;
        $scope.showPlaylistPage = false;
    };
    $scope.addSongToPlaylist = function(song) {
        var songWithIndex = {
            id: song.id,
            url: song.url,
            album: song.album,
            author: song.author,
            title: song.title,
            pitch: song.pitch,
            fade_start_time: song.fade_start_time,
            fade_stop_time: song.fade_stop_time,
            volume: song.volume,
            playlistIndex: $scope.playlistIndex
        };
        $scope.playlistIndex++;

        $scope.audioPlaylistDisplay.push(songWithIndex);
        $scope.audioPlaylist.push({src: 'https://s3.amazonaws.com/emphonic-player-demo/uploads/' + song.url, type: 'audio/ogg'});
    };
    $scope.nextPlaylistFoldersPage = function() {
        $scope.playlistFoldersPage++;
    };
    $scope.prevPlaylistFoldersPage = function() {
        $scope.playlistFoldersPage--;
    };

});


