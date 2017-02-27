  angular.module('stocks_shop').controller('RecapController',
  ['$scope', '$http', function($scope, $http) {

    // Appelle updateChart() dès que 'updateChart' est broadcasté
    $scope.$on('updateChart', updateChart);

    // Mets à jour le graphique récapitulatif
    function updateChart(event, value) {
      $http.get('http://localhost:3000/sales')
      .then(function(response) {
        // Définit les caractéristiques des axes du grahique
        var dates = ['x'];
        var values = ['+/- values'];

        // Définit le solde initial
        var beginWith = 800;

        // Pour chaque vente en base
        response.data.forEach(function(data) {
          // Construit de la date de la vente bien formattée
          var dateInDb = new Date(data.date);
          var dateContent = dateInDb.getFullYear() + '-' + dateInDb.getMonth() + '-' + dateInDb.getDate() + ' ' + dateInDb.getHours() + ':' + dateInDb.getMinutes() + ':' + dateInDb.getSeconds();
          var date = new Date(dateContent);
          // Ajoute la date aux données en x
          dates.push(date);
          // Calcule le nouveau solde
          beginWith = beginWith + Number(data.value);
          // Ajoute le solde aux données en y
          values.push(beginWith);
        });

        // Affiche uniquement les 10 derniers mouvements
        if(dates.length > 10) {
          dates = dates.slice(10);
          dates.unshift('x');
          values = values.slice(10);
          values.unshift('x/- values');
        }

        // Genère le graphique via C3js
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
            }
        });
      }, function(error) {
        console.log(error);
      });
    }

    // Appelle updateChart() une première fois
    updateChart();

}]);
