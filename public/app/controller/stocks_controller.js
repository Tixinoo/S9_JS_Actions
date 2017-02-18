angular.module('stocks_shop').controller('StocksController',
  ['$scope', '$http', 'Stock', function($scope, $http, Stock) {

    // Appelle updateStocks() dès que 'updateStocks' est broadcasté
    $scope.$on('updateStocks', updateStocks);

    // Mets à jour le portefeuille d'actions
    function updateStocks(event, value) {
      $http.get('http://localhost:3000/stocks')
      .then(function(response) {
        $scope.stocks = [];
        response.data.forEach(function(data) {
          var newStock = new Stock(data.reference, data.description, data.price);
          //TODO: Récupérer le nouveau prix de l'action
          //Pour l'instant, prix de vente = 90% du prix d'achat
          newStock.retailprice = (newStock.price * 0.90);
          $scope.stocks.push(newStock);
        });
      }, function(error) {
        console.log(error);
      });
    }

    // Appelle updateStocks() une première fois
    updateStocks();

}]);
