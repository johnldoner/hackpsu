angular.module('starter.controllers', [])

 .controller("FeedController", function($http, $scope) {
 
    $scope.init = function() {
        $http.get("http://ajax.googleapis.com/ajax/services/feed/load", 
          { params: { "v": "1.0", "q": "http://blog.nraboy.com/feed/" } })
            .success(function(data) {
                $scope.rssTitle = data.responseData.feed.title;
                $scope.rssUrl = data.responseData.feed.feedUrl;
                $scope.rssSiteUrl = data.responseData.feed.link;
                $scope.entries = data.responseData.feed.entries;
                 window.localStorage["entries"] = JSON.stringify(data.responseData.feed.entries);
 
            })
            .error(function(data) {
                console.log("ERROR: " + data);
                 if(window.localStorage["entries"] !== undefined) {
                    $scope.entries = JSON.parse(window.localStorage["entries"]);
                }
            });
    }
    $scope.browse = function(v) {
    window.open(v, "_system", "location=yes");
}
 
})

.controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {

 // Triggered on a button click, or some other target
 $scope.showPopup = function() {
   $scope.data = {}

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<input type="text" ng-model="data.reddit">',
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


/*.controller('PopupCtrl', function($scope, $timeout, $q, $ionicPopup) {
    $scope.showPopup = function() {
        $ionicPopup.alert({
            title: 'Success',
            content: 'Hello World!!!'
        }).then(function(res) {
            console.log('Test Alert Box');
        });
    };

})
*/

.controller('StudyBreakCtrl', function($scope) {

  $scope.groups = [
  "Upcoming Facebook Events",
  "Reddit Stress Reduction"
  ];
  

/*  for (var i=0; i<5; i++) {
    $scope.groups[i] = {
      name: i,
      items: []
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }*/
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
})


.controller('SignInCtrl', function($scope, $state) {
  
  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    $state.go('app.settings');
  };
  
});

