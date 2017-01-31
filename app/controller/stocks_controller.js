angular.module('stocks_shop').controller('StocksController',
  ['$scope', '$http', 'Stock', function($scope, $http, Stock) {

    $scope.stocks = [];
    var data = {reference:"XB2212",price:"$10"};
    var newStock = new Stock(data);
    var data2 = {reference:"XB2213",price:"$13"};
    var newStock2 = new Stock(data2);
    $scope.stocks.push(newStock);
    $scope.stocks.push(newStock2);

  }]);
