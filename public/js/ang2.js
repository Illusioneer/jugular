var MyApp = angular.module("MyApp", ['ngSanitize']);

//= require angular
//= require angular-resource
//= require angular-sanitize

MyApp.controller("Control", function($scope, $http, $location, $sce){
  
  $scope.blog = {name: 'Name', email: 'email'};
  
  $scope.snippet = '<p style="color:blue">an html <em onmouseover="this.textContent='+$scope.blog.name+'">click here</em> snippet</p>';
  
   $scope.DangerousSnippet = function(snippet) {
     console.log("Dangerous person you!");	
    return $sce.trustAsHtml(snippet);
  };
  
  $scope.post = {name: 'Blobbert', email: 'email', entry: '<h1>HEY Hey Hey its fat Albert!</h1>'};
  
  $scope.submitPost = function () {
    
    $scope.blog['name'] = {"name":$scope.post['name'], "email":$scope.post['email']};
    $scope.blog['email'] = {"content":tinymce.get('entry').getContent()};
    
    $http.post('/submit', $scope.blog).
      success(function(data) {
	  var applied = setInterval( function()
	  {
	  if($scope.$$phase != '$digest' && $scope.$$phase != '$apply') {
	    $scope.blog.result = data;
	    $scope.evil = data.email.content;
	    console.log($scope.evil);
	    $scope.DangerousSnippet($scope.evil);
	    $scope.snippet = $scope.evil;
	    $scope.$apply(); 
	    clearInterval(applied);
	    };
	  }, 500 );
      });
  };
  
});