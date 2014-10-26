'use strict';

app.controller('NavCtrl', ['$scope', '$location', 'Post', 'Auth',
    function ($scope, $location, Post, Auth) {
        $scope.post = {
            url: 'http://',
            title: ''
        };

        $scope.logout = Auth.logout;
        $scope.signedIn = Auth.signedIn;
        $scope.user = Auth.user;
        
        $scope.submitPost = function (post) {
            post.title = post.title.trim();
            if (!post.title) { return; }

            post.creator = $scope.user.profile.username;
            post.creatorUID = $scope.user.uid;
            post.commentCount = 0;

            Post.create(post).then(function (ref) {
                $location.path('/posts/' + ref.name());
                $scope.post = {
                    url: 'http://',
                    title: ''
                };
            });
        };
    }]);