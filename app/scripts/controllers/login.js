'use strict';

app.controller('LoginCtrl', ['$scope', '$location', 'Auth', 'user',
    function ($scope, $location, Auth, user) {

        var goHome = function () {
            $location.path('/');
        };

        if (user) {
            goHome();
        }

        $scope.register = function (newUser) {
            if (!newUser) {
                $scope.registrationError = 'Enter your account info.';
                return;
            }

            Auth.register(newUser).then(function (user) {
                return Auth.login(newUser).then(function() {
                    user.username = $scope.newUser.username;
                    return Auth.createProfile(user);
                }).then(goHome);
            }, function (error) {
                var code = error.code;
                if (code === 'INVALID_EMAIL') {
                    $scope.registrationError = 'Invalid email.';
                } else if (code === 'EMAIL_TAKEN') {
                    $scope.registrationError = 'Email already taken.';
                }
            });
        };

        $scope.login = function (user) {
            Auth.login(user).then(goHome, function () {
                $scope.loginError = 'Invalid email or password.';
            });
        };
    }]);