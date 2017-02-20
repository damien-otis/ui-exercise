'use strict';

(() => {
  angular.module('app')
  .service('appService', appService);

  function appService(){
  	var self = this;

	  	self.getWidgets = () => {
	    	return new Promise(function (resolve) {
		      resolve([{
		        name:     "Standard widget",
		        size:     'medium',
		        capacity: 10
		      }, {
		        name:     "VIP widget",
		        size:     "extra-large",
		        capacity: 25
		      }, {
		        name:     "Starter widget",
		        size:     'small',
		        capacity: 2
		      }])
	    })
	  }

  	return self
  }

})();

