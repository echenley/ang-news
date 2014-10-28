'use strict';

app.factory('Post', ['$firebase', 'FIREBASE_URL', '$q', function ($firebase, FIREBASE_URL, $q) {
    var ref = new Firebase(FIREBASE_URL);
    var posts = $firebase(ref.child('posts')).$asArray();

    var Post = {
        all: posts,
        create: function (post) {
            console.log(post);
            return posts.$add(post).then(function(postRef) {
                $firebase(ref.child('user_posts').child(post.creatorUID)).$set(postRef.name(), true);
                return postRef;
            });
        },
        find: function (postId) {
            var defer = $q.defer();
            $firebase(ref.child('posts').child(postId)).$asObject().$loaded()
                .then(function (data) {
                    defer.resolve(data);
                });
            return defer.promise;
        },
        delete: function (post) {
            post = posts.$getRecord(post.$id);
            return posts.$remove(post).then(function (postRef) {
                $firebase(ref.child('user_posts').child(post.creatorUID)).$remove(postRef.name());
                return postRef;
            });
        },
        comments: function (postId) {
            var defer = $q.defer();
            $firebase(ref.child('comments').child(postId)).$asArray().$loaded()
                .then(function (data) {
                    defer.resolve(data);
                });
            return defer.promise;
        },
        updateCommentCount: function (postId, n) {
            // n is 1 or -1
            $firebase(ref.child('posts').child(postId).child('commentCount'))
                .$transaction(function(curr) {
                    return curr + n;
                });
        }
    };
    return Post;
}]);