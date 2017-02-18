  angular.module('stocks_shop').controller('ReferenceSumsController',
  ['$scope', '$http', 'ReferenceSum', function($scope, $http, ReferenceSum) {

    // Appelle updateReferenceSums() dès que 'updateReferenceSums' est broadcasté
    $scope.$on('updateReferenceSums', updateReferenceSums);

    // Mets à jour le récapitulatif des gains/pertes pour chaque référence achetée
    function updateReferenceSums(event, value) {
      $http.get('http://localhost:3000/sales/sum')
      .then(function(response) {
        $scope.referencesums = [];
        response.data.forEach(function(data) {
          var newReferenceSum = new ReferenceSum(data._id, data.quantity, data.value);
          $scope.referencesums.push(newReferenceSum);
        });
      }, function(error) {
        console.log(error);
      });
    }

    // Appelle updateReferenceSums() une première fois
    updateReferenceSums();

}]);
