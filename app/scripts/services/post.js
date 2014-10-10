'use strict';

app.factory('Post', ['$firebase', 'FIREBASE_URL', function ($firebase, FIREBASE_URL) {
	var ref = new Firebase(FIREBASE_URL + 'posts');
	var posts = $firebase(ref).$asArray();
	var Post = {
		all: posts,
		create: function (post) {
			return posts.$add(post);
		},
		find: function (postId) {
			return $firebase(ref.child(postId)).$asObject();
		},
		delete: function (post) {
			return posts.$remove(post);
		}
	};
	return Post;
}]);