angular.module('EmphonicPlayer').factory('AmazonService', function($http, $q) {
    return {
        getKey: function() {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get('https://emphonic-rails-api.herokuapp.com/amazon/sign_key')
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
        },
        sendToS3: function(amazonSignKey, file, title, author, album, playlist) {
            console.log("inside sendToS3");
            var formData = new FormData();
            formData.append('acl', amazonSignKey.acl);
            formData.append('key', amazonSignKey.key);
            formData.append('AWSAccessKeyId', amazonSignKey.access_key);
            formData.append('Policy', amazonSignKey.policy);
            formData.append('Signature', amazonSignKey.signature);
            formData.append('file', file);

            console.log("loading file to s3...");

            $http.post('http://emphonic-player-demo.s3.amazonaws.com/', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(){
                var cell = 20;
                console.log("file uploaded to S3 successfully");
                if (playlist == "Bachata") {
                    cell = 1;
                } else if (playlist == "Cha Cha") {
                    cell = 2;
                } else if (playlist == "Foxtrot") {
                    cell = 3;
                } else if (playlist == "Pasodoble") {
                    cell = 4;
                } else if (playlist == "Rumba") {
                    cell = 5;
                } else if (playlist == "Salsa") {
                    cell = 6;
                } else if (playlist == "Samba") {
                    cell = 7;
                } else if (playlist == "Tango") {
                    cell = 8;
                } else if (playlist == "Waltz") {
                    cell = 9;
                }
                var psqlData = {
                    song: {
                        "url": amazonSignKey.key.replace("uploads/", ""),
                        "title": title,
                        "author": author,
                        "album": album,
                        "pitch": "0",
                        "volume": "100",
                        "fade_start_time": "0",
                        "fade_stop_time": "0"
                    },
                    playlist: {
                        "playlist": playlist,
                        "cell": cell
                    }
                }
                $http.post('https://emphonic-rails-api.herokuapp.com/songs', psqlData)
                .success(function(){
                    console.log("info posted to psql successfully");
                })
                .error(function(){
                    console.log("some error occured while posting to psql");
                });
            })
            .error(function(){
                console.log("some error occured while uploading to S3");
            });
        },
    };
});
