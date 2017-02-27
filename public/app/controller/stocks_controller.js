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
          //TODO: Récupérer le nouveau prix de l'action
          //Pour l'instant, prix de vente random
          var retailprice = (data.price * Math.floor((Math.random() * 200) -100));
          var newStock = new Stock(data._id, data.reference, data.description, data.price, retailprice);
          $scope.stocks.push(newStock);
        });
      }, function(error) {
        console.log(error);
      });
    }

    // Appelle updateStocks() une première fois
    updateStocks();

}]);
