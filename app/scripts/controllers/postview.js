'use strict';

app.controller('PostViewCtrl', ['$scope', '$routeParams', 'Post', 'Auth',
	function ($scope, $routeParams, Post, Auth) {
	    $scope.post = Post.find($routeParams.postId);
	    $scope.comments = Post.comments($routeParams.postId);

	    $scope.user = Auth.user;
	    $scope.signedIn = Auth.signedIn;

	    var increaseCommentCount = function () {
	    	Post.updateCommentCount($routeParams.postId, 1);
	    };
	    var decreaseCommentCount = function () {
	    	Post.updateCommentCount($routeParams.postId, -1);
	    };

	    $scope.addComment = function (commentText) {
	    	commentText = commentText.trim();
	    	if (!commentText) { return; }
	    	var comment = {
	    		text: commentText,
	    		creator: $scope.user.profile.username,
	    		creatorUID: $scope.user.uid
	    	};
	    	$scope.comments.$add(comment).then(increaseCommentCount);
	    	$scope.commentText = '';
	    };

	    $scope.deleteComment = function (comment) {
	    	$scope.comments.$remove(comment).then(decreaseCommentCount);
	    };

	}]);