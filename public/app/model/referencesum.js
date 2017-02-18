angular.module('stocks_shop').factory('ReferenceSum',
  ['$rootScope', '$http', function($rootScope, $http) {

    var ReferenceSum = function(reference, quantity, value) {
      this.reference = reference,
      this.quantity = quantity,
      this.value = value
    }

    return ReferenceSum;

  }]);
