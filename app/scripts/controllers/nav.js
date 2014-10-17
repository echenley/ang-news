'use strict';

app.controller('NavCtrl', ['$scope', '$location', 'Post', 'Auth',
    function ($scope, $location, Post, Auth) {
        $scope.post = {
            url: 'http://',
            title: ''
        };

        $scope.logout = function () {
            Auth.logout();
        };
        $scope.signedIn = function () {
            return Auth.signedIn();
        };
        $scope.user = Auth.user;
        
        $scope.submitPost = function (post) {
            if (post.title === '') {
                return;
            }
            $scope.post.creator = $scope.user.profile.username;
            $scope.post.creatorUID = $scope.user.uid;
            Post.create(post).then(function (ref) {
                $location.path('/posts/' + ref.name());
                $scope.post = {
                    url: 'http://',
                    title: ''
                };
            });
        };
    }]);