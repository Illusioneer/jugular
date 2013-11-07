var sampleApp = angular.module('sampleApp', []);
 
sampleApp.config(['$routeProvider','$locationProvider', 
  function($routeProvider) {
    $routeProvider.
      when('/ShowOrder/:orderId', {
    templateUrl: 'partials/show-orders.html',
    controller: 'ShowOrderController'
      });
    }]);
 
sampleApp.controller('ShowOrderController', function($scope, $routeParams) {
 
    $scope.order_id = $routeParams.orderId;
 
});