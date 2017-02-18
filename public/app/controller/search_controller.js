angular.module('stocks_shop').controller('SearchController',
  ['$rootScope', '$scope', '$http', 'Stock', function($rootScope, $scope, $http, Stock) {

    $scope.search = search;
    $scope.stock_results = [];

    function search() {
      $scope.stock_results = [];
      $http.get('http://localhost:3000/search/'+$scope.symbol)
      .then(function(response) {

        var quote = response.data.query.results.quote;
        var newStock_result = new Stock(quote.Symbol, quote.Name, quote.PriceSales);
        $scope.stock_results.push(newStock_result);

      }, function(error) {
        console.log(error);
      });
    }

  }]);
