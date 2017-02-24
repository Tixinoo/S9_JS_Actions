  angular.module('stocks_shop').controller('RecapController',
  ['$scope', '$http', function($scope, $http) {

    // Appelle updateChart() dès que 'updateChart' est broadcasté
    $scope.$on('updateChart', updateChart);

    // Mets à jour le graphique récapitulatif
    function updateChart(event, value) {
      $http.get('http://localhost:3000/sales/sum')
      .then(function(response) {
        response.data.forEach(function(data) {
          //TODO
        });
      }, function(error) {
        console.log(error);
      });
    }

    // Appelle updateChart() une première fois
    updateChart();

}]);
