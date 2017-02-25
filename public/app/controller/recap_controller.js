  angular.module('stocks_shop').controller('RecapController',
  ['$scope', '$http', function($scope, $http) {

    // Appelle updateChart() dès que 'updateChart' est broadcasté
    $scope.$on('updateChart', updateChart);

    // Mets à jour le graphique récapitulatif
    function updateChart(event, value) {
      $http.get('http://localhost:3000/sales')
      .then(function(response) {
        var dates = ['x'];
        var values = ['+/- values'];
        var beginWith = 800;
        response.data.forEach(function(data) {
          var d = new Date(data.date);
          var date = new Date(d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds());
          dates.push(date);
          beginWith = beginWith + Number(data.value);
          values.push(beginWith);
        });
        var chart = c3.generate({
            bindto: '#chart',
            data: {
                x: 'x',
                columns: [
                    dates,
                    values
                ]
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        //format: '%Y-%m-%dT%H:%M:%S.%fZ'
                        format: '%Y-%m-%d %H:%M:%S'
                    }
                }
            }
        });
      }, function(error) {
        console.log(error);
      });
    }

    // Appelle updateChart() une première fois
    updateChart();

}]);
