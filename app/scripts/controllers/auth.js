'use strict';

app.controller('AuthCtrl', ['$scope', '$location', 'Auth',
	function ($scope, $location, Auth) {

		var goHome = function () {
			$location.path('/');
		};

		if (Auth.signedIn()) {
			goHome();
		}

		$scope.$on('$firebaseSimpleLogin:login', goHome);

		$scope.register = function (newUser) {
			if (!newUser) {
				$scope.registrationError = 'Enter an email and password.';
				return;
			}

			Auth.register(newUser).then(function () {
				Auth.login(newUser).then(goHome);
			}, function (error) {
				var code = error.code;
				console.log(code);
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