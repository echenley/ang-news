'use strict';

app.controller('PostsCtrl', ['$scope', 'Post', function ($scope, Post) {
    $scope.posts = Post.all;

    $scope.deletePost = function (post) {
        Post.delete(post);
    };
}]);