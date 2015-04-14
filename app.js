angular.module('EmphonicPlayer', ['mediaPlayer']);

angular.module('EmphonicPlayer').run(function(SongsFactory){
    SongsFactory.fetch();
});

angular.module('EmphonicPlayer').controller('MainCtrl', function($scope, $http, SongsFactory, AmazonService) {
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
        console.log("inside getAmazonURL()");
        var promise = $http.get('http://localhost:3000/amazon/sign_key')
        .success(function(response){
            // $scope.response = response;
            console.log(response);
            // debugger;
        }).error(function(data, status, headers, config){
            console.log(data);
            console.log(status);
            console.log("error");
        });
        return promise;
    };

    $scope.uploadToS3 = function() {
        console.log("inside uploadToS3()");
        var amazonSignKey = {};

        var makePromiseWithAmazon = function() {
            console.log("inside makePromiseWithAmazon");
            // This service's function returns a promise, but we'll deal with that shortly
            AmazonService.getKey()
                // then() called when son gets back
                .then(function(data) {
                    amazonSignKey = data;
                    console.log(data);
                    sendToS3();
                }, function(error) {
                    // promise rejected, could log the error with: console.log('error', error);
                    console.log(error);
                });
        };

        var sendToS3 = function() {
            console.log("inside sendToS3");
            var formData = new FormData();
            formData.append('acl', amazonSignKey.acl);
            formData.append('key', amazonSignKey.key);
            formData.append('AWSAccessKeyId', amazonSignKey.access_key);
            formData.append('Policy', amazonSignKey.policy);
            formData.append('Signature', amazonSignKey.signature);
            formData.append('file', $scope.myAudioFile);

            console.log("loading file to s3...");

            $http.post('http://emphonic-player-demo.s3.amazonaws.com/', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(){
                console.log("file uploaded to S3 successfully");
            })
            .error(function(){
                console.log("some error occured while uploading to S3");
            });
        };

        makePromiseWithAmazon();
    }

});


