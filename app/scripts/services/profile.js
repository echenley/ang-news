'use strict';

app.factory('Profile', ['FIREBASE_URL', '$firebase', 'Post', '$q',
	function (FIREBASE_URL, $firebase, Post, $q) {
		var ref = new Firebase(FIREBASE_URL);
		var profile = {
			get: function (userId) {
				return $firebase(ref.child('profile').child(userId)).$asObject();
			},
			getPosts: function (userId) {
				var defer = $q.defer();

				$firebase(ref.child('user_posts').child(userId)).$asArray().$loaded()
					.then(function (data) {
						var posts = {};
						data.forEach(function(post) {
							var key = post.$id;
							posts[key] = Post.find(key);
						});
						defer.resolve(posts);
					});

				return defer.promise;
			}
		};
		return profile;
	}]);