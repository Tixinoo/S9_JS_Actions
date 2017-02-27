angular.module('stocks_shop').factory('ReferenceSum',
  ['$rootScope', '$http', function($rootScope, $http) {

    /**
     * Un objet "ReferenceSum" stocke :
     *  - pour une référence (<=> un symbole)
     *  - la quantité d'actions vendues
     *  - la +/- value totale sur ces ventes
     */
    var ReferenceSum = function(reference, quantity, value) {
      this.reference = reference,
      this.quantity = quantity,
      this.value = value
    }

    return ReferenceSum;

  }]);
