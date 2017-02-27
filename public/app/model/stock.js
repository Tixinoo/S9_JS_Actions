angular.module('stocks_shop').factory('Stock',
  ['$rootScope', '$http', function($rootScope, $http) {

    var Stock = function(id, reference, description, price, retailprice) {
      this.id = id;
      this.reference = reference;
      this.description = description;
      this.price = price;
      this.retailprice = retailprice;
    }

    Stock.prototype.buy = function() {
      var data = {
        reference : this.reference,
        description : this.description,
        price : this.price
      }
      $http.post('http://localhost:3000/stocks', data);
      $rootScope.$broadcast('updateStocks');
      $rootScope.$broadcast('updateReferenceSums');
    }

    Stock.prototype.sell = function() {
      var val = Number(this.retailprice) - Number(this.price);
      var float = parseFloat(val);
      var data = {
        reference : this.reference,
        description : this.description,
        value : float,
        quantity : "1", //TODO: Permettre de vendre plusieurs actions
        date : new Date()
      }
      $http.delete('http://localhost:3000/stocks/' + this.id);
      $http.post('http://localhost:3000/sales', data);
      $rootScope.$broadcast('updateStocks');
      $rootScope.$broadcast('updateReferenceSums');
      $rootScope.$broadcast('updateChart');
    }

    return Stock;

  }]);
