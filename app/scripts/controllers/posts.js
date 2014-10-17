'use strict';

app.controller('PostsCtrl', ['$scope', 'Post', 'Auth', function ($scope, Post, Auth) {
    $scope.posts = Post.all;
    $scope.user = Auth.user;

    $scope.deletePost = function (post) {
        Post.delete(post);
    };
}]);