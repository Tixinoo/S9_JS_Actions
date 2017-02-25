angular.module('stocks_shop').factory('Stock',
  ['$rootScope', '$http', function($rootScope, $http) {

    var Stock = function(reference, description, price) {
      this.reference = reference;
      this.description = description;
      this.price = price;
    }

    Stock.prototype.buy = function() {
      console.log("Achat de l'action dont le symbole est: " + this.reference + " et dont le prix est de: " + this.price);
      var data = {
        reference : this.reference,
        description : this.description,
        price : this.price
      }
      $http.post('http://localhost:3000/stocks', data);
      $rootScope.$broadcast('updateStocks');
      $rootScope.$broadcast('updateReferenceSums');
      $rootScope.$broadcast('updateChart');
    }

    Stock.prototype.sell = function() {
      console.log("Vente d'une action achetée à: " + this.price + " et vendue à: " + this.retailprice);
      var val = Number(this.retailprice) - Number(this.price);
      var float = parseFloat(val);
      console.log("val:"+val);
      var data = {
        reference : this.reference,
        description : this.description,
        value : float,
        quantity : "1",
        date : new Date()
      }
      console.log(data);
      $http.delete('http://localhost:3000/stocks/' + this.id);
      $http.post('http://localhost:3000/sales', data);
      $rootScope.$broadcast('updateStocks');
      $rootScope.$broadcast('updateReferenceSums');
    }

    return Stock;

  }]);
