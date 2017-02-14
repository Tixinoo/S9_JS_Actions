angular.module('stocks_shop').factory('Stock',
  [function() {
    var Stock = function(data) {
      this.reference = data.reference;
      this.description = data.description;
      this.price = data.price;
    }

    Stock.prototype.buy = function() {
      console.log("Achat d'une action");
    }

    return Stock;
  }]);
