angular.module('stocks_shop').controller('StocksController',
  ['$scope', '$http', 'Stock', function($scope, $http, Stock) {

    $scope.$on('updateStocks', updateStocks);

    function updateStocks(event, value) {
      $http.get('http://localhost:3000/stocks')
      .then(function(response) {
        $scope.stocks = [];
        response.data.forEach(function(data) {
          var newStock = new Stock(data.reference, data.description, data.price);
          newStock.retailprice = (newStock.price * 0.90);
          $scope.stocks.push(newStock);
        });
      }, function(error) {
        console.log(error);
      });
    }

    updateStocks();

}]);
