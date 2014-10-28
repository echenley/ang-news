'use strict';

app.controller('ProfileCtrl', ['$scope', 'Auth', 'Post', 'profile', 'posts',
	function ($scope, Auth, Post, profile, posts) {

	    $scope.user = Auth.user;
	    $scope.signedIn = Auth.signedIn;
		$scope.profile = profile;
		$scope.posts = posts;

	    $scope.deletePost = function (post) {
	        Post.delete(post).then(function() {
	        	delete $scope.posts[post.$id];
	        });
	    };
	}]);