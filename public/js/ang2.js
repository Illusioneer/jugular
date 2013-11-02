var MyApp = angular.module("MyApp", []);

//= require angular
//= require angular-resource
//= require angular-sanitize

MyApp.controller("Control", function($scope, $http, $location){
  
  $scope.blog = {name: 'Name', email: 'email'};
  $scope.post = {name: 'Blobbert', email: 'email', entry: '<h1>HEY</h1>'};
  console.log("What up?");
//  $http.get('https://api.github.com/users/mralexgray/repos').success(function (data) {
  //      $scope.foo_lists = data[0].id;
    //});
  $scope.submitPost = function () {
    
    $scope.blog['name'] = {"name":$scope.post['name'], "email":$scope.post['email']};
    $scope.blog['email'] = {"content":$scope.post.entry};
    
    $http.post('/submit', $scope.blog).
      success(function(data) {
	  var applied = setInterval( function()
	  {
	  if($scope.$$phase != '$digest' && $scope.$$phase != '$apply') {
	    $scope.blog.result = data;
	    $scope.evil = data.email.content;
	    console.log($scope.evil);
	    $scope.$apply(); 
	    clearInterval(applied);
	    };
	  }, 500 );
      });
  };
  
});