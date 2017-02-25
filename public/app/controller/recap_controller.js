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
          var dateInDb = new Date(data.date);
          var dateContent = dateInDb.getFullYear() + '-' + dateInDb.getMonth() + '-' + dateInDb.getDate() + ' ' + dateInDb.getHours() + ':' + dateInDb.getMinutes() + ':' + dateInDb.getSeconds();
          var date = new Date(dateContent);
          dates.push(date);
          beginWith = beginWith + Number(data.value);
          values.push(beginWith);
        });

        if(dates.length > 10) {
          dates = dates.slice(10);
          dates.unshift('x');
          values = values.slice(10);
          values.unshift('x/- values');
        }
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
                    label: 'temps',
                    type: 'timeseries',
                    tick: {
                        //format: '%Y-%m-%dT%H:%M:%S.%fZ'
                        format: '%Y-%m-%d %H:%M:%S'
                    }
                },
                y: {
                    label: '$$$'
                }
                /*x: {
                    type : 'categorized',
                    tick: {
                        format: function (x) { return ''; }
                    }
                }*/
            }
        });
      }, function(error) {
        console.log(error);
      });
    }

    // Appelle updateChart() une première fois
    updateChart();

}]);
