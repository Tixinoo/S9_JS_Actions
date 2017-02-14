angular.module('stocks_shop').directive('search',
  [function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'template/stock_result.html',
      link: function(scope, element, attrs) {
        scope.buy = function() {
          scope.stock_result.buy();
        }
      }
    }
  }]);
