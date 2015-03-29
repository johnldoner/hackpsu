angular.module('starter.controllers', [])

  .controller('FeedController', function($scope, $http, $timeout) {
           $scope.refreshInterval = 60;
    $scope.feeds = [{
      url: 'http://www.reddit.com/r/cats/.rss'
    }];

    $scope.fetchFeed = function(feed) {
      feed.items = [];

      var apiUrl = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'";
      apiUrl += encodeURIComponent(feed.url);
      apiUrl += "'%20and%20itemPath%3D'feed.entry'&format=json&diagnostics=true&callback=JSON_CALLBACK";

      $http.jsonp(apiUrl).
        success(function(data, status, headers, config) {
          if (data.query.results) {
            feed.items = data.query.results.entry;
          }
        }).
        error(function(data, status, headers, config) {
          console.error('Error fetching feed:', data);
        });

      $timeout(function() { $scope.fetchFeed(feed); }, $scope.refreshInterval * 1000);
    };

  })


.controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {

 // Triggered on a button click, or some other target
 $scope.showPopup = function() {
   $scope.data = {}

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<input type="text" ng-model= "data.reddit">',
     subTitle: 'Just add /.rss to the URL of your favorite feed.',
     scope: $scope,
     buttons: [
       { text: 'Cancel' ,
       type: 'button-default'},
       {
         text: '<b>Save</b>',
         type: 'button-royal',
         onTap: function(e) {
           if (!$scope.data.reddit) {
             //don't allow the user to close unless he enters wifi password
             e.preventDefault();
           } else {
             return $scope.data.reddit;
           }
         }
       },
     ]
   });
};
})


.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('SignInCtrl', function($scope, $state) {
  
  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    $state.go('app.settings');
  };
  
});

