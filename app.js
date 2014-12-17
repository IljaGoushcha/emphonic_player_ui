angular.module('EmphonicPlayer', []);

angular.module('EmphonicPlayer').controller('MainCtrl', function($scope, $q) {
    'use strict';

    var key = "";

    $scope.getAmazonURL = function() {
        // $http.get('http://localhost:3000/amazon/sign_key').success(function(response){
        //     signKeyResults = response;
        //     debugger;
        // });

        console.log("hi");
        $.ajax({
            url: 'http://localhost:3000/amazon/sign_key',
            type: 'GET',
            data: {file_name: 'url.jpg'}
        })
        .done(function(result) {
            // $scope.policy = result.policy;
            $('#uploadPolicy').val(result.policy);
            $('#uploadSignature').val(result.signature);
            $('#accessKey').val(result.access_key);
            $('#acl').val(result.acl);
            $('#key').val(result.key);
            key = "https://s3.amazonaws.com/emphonic-player-demo/" + result.key;
            console.log(key);
        })
        .fail(function(error) {
            console.log(error);
            console.log("error");
        })
          .always(function() {
            console.log("complete");
          });
    };
});

angular.module('EmphonicPlayer').directive('uploadModal', function() {
    return {
        restrict: 'E',

        transclude: true,

        templateUrl: 'templates/upload-modal.html',

        scope: {
            title: '@'
        }
    };
});

// angular.module('EmphonicPlayer').directive('AddSongModal', function() {
//     return {
//         restrict: 'E',

//         transclude: true,

//         templateUrl: 'templates/modal.html',

//         scope: {
//             title: '@'
//         }
//     };
// });
