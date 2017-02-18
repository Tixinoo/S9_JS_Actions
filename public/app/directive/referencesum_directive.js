angular.module('stocks_shop').directive('referencesum',
  [function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'template/referencesum.html',
    }
  }]);
