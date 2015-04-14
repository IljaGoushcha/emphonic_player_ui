angular.module('EmphonicPlayer').factory('AmazonService', function ($http, $q) {
    return {
        getKey: function() {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.get('http://localhost:3000/amazon/sign_key')
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
        sendToS3: function(amazonSignKey, file, title, author, album) {
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
                console.log("file uploaded to S3 successfully");
                var psqlData = {
                    song: {
                      "url": amazonSignKey.key,
                      "title": title,
                      "author": author,
                      "album": album,
                      "pitch": "0",
                      "volume": "100",
                      "fade_start_time": "0",
                      "fade_stop_time": "0"
                    }
                }
                $http.post('http://localhost:3000/songs', psqlData)
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
