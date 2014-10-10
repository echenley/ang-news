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
		
		$scope.submitPost = function (post) {
			if (post.title === '') {
				return;
			}
			Post.create(post).then(function (ref) {
				$location.path('/posts/' + ref.name());
				$scope.post = {
					url: 'http://',
					title: ''
				};
			});
		};
	}]);