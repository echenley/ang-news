'use strict';

app.controller('SingleCtrl', ['$scope', '$routeParams', 'Post', 'Auth', 'post', 'comments',
	function ($scope, $routeParams, Post, Auth, post, comments) {
	    $scope.post = post;
	    $scope.comments = comments;

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

