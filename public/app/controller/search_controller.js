angular.module('stocks_shop').controller('SearchController',
  ['$scope', '$http', function($scope, $http) {

    $scope.search = search;
    $scope.stock_results = [];

    function search() {
      $scope.stock_results = [];
      $http.get('http://localhost:3000/search/'+$scope.symbol)
      .then(function(response) {
        console.log(response);
        var stock_result = {
          reference : response.data.query.results.quote.Symbol,
          description : response.data.query.results.quote.Name,
          price : response.data.query.results.quote.PriceSales
        }
        $scope.stock_result = stock_result;
        $scope.stock_results.push(stock_result);
      }, function(error) {
        console.log(error);
      });
    }

  }]);
