angular.module('stocks_shop').directive('stock',
  [function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'template/stock.html',
      link: function(scope, element, attrs) {
        scope.buy = function() {
          scope.stock.buy();
        }
        scope.sell = function() {
          scope.stock.sell();
        }
      }
    }
  }]);
