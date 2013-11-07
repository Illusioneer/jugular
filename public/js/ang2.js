var MyApp = angular.module("MyApp", []);

MyApp.controller("Control", function($scope, $http, $location){
  
  $scope.blog = {name: 'Name', email: 'email'};
  $scope.post = {name: 'Blobbert', email: 'email', entry: '<h1>HEY</h1>'};
  console.log("What up?");
  
  $scope.submitPost = function () {
    $scope.blog.fields = {metadata: {}, content: {}};
    $scope.blog.fields['metadata'] = {"name":$scope.post['name'], "email":$scope.post['email']};
    $scope.blog.fields['content'] = {"content":$scope.post.entry};
    $scope.blog.table = 'testdata';
    
    $http.post('/submit', $scope.blog).
      success(function(data) {
	  var applied = setInterval( function()
	  {
	  if($scope.$$phase != '$digest' && $scope.$$phase != '$apply') {
	    $scope.evil = $scope.blog.fields.content.content;
	    console.log($scope.evil);
	    $scope.$apply(); 
	    clearInterval(applied);
	    };
	  }, 500 );
      });
  };
  
});