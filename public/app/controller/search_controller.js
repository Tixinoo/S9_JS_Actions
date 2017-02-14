angular.module('stocks_shop').controller('SearchController',
  ['$scope', '$http', function($scope, $http) {

    $scope.search = search;
    $scope.stock_results = [];

    function search() {
      $scope.stock_results = [];
      $http.get('http://localhost:3000/search/'+$scope.symbol)
      .then(function(response) {

        // Définit un objet Stock_result
        var Stock_result = function(response) {
          this.reference = response.data.query.results.quote.Symbol;
          this.description = response.data.query.results.quote.Name;
          this.price = response.data.query.results.quote.PriceSales;
        };
        Stock_result.prototype.buy = function() {
          console.log("Achat de l'action dont le symbole est: " + this.reference + " et dont le prix est de: " + this.price);
          // TODO: POST
          var data = {
            reference : this.reference,
            description : this.description,
            price : this.price
          }
          $http.post('http://localhost:3000/stocks', data);
        };

        // Crée et ajoute une instance de Stock_result au scope
        var stock_result = new Stock_result(response);
        $scope.stock_result = stock_result;
        $scope.stock_results.push(stock_result);
        
      }, function(error) {
        console.log(error);
      });
    }

  }]);
