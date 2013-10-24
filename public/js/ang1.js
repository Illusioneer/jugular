var mockDataForThisTest = "json=" + encodeURI(JSON.stringify([
    {
    firstName: "Peter",
    lastName: "Jhons"},
{
    firstName: "David",
    lastName: "Bowie"}
]));


var app = angular.module('myApp', []);

function PeopleCtrl($scope, $http) {

    $scope.people = [];

    $scope.loadPeople = function() {
        var httpRequest = $http.get('/jason').success(function(data, status) {
	  console.log(data.people);
            $scope.people = data.people;
	});
    };
}

