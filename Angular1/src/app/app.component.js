'use strict';

(() => {
  angular.module('app')
  .component('app', {
    templateUrl: 'app/app.html',
    controller: appController,
    controllerAs: 'vm'
  })
  .filter('widgetFilter', widgetFilter);

  appController.$inject = ['$scope','appService'];

  function appController($scope, appService) {
    const vm = this;

    vm.widgets = [];

		appService.getWidgets().then((data)=>{
    	vm.widgets = data;
    	$scope.$apply()
    });

	
    vm.sliderConfig = {
      floor: 1,
      ceil: 100,
      step: 1
		}

    vm.sliderValues = {
			minValue: 1,
	    maxValue: 100,
    }

    vm.filterByName = "";

    vm.sizes = {
    	small			: false,
    	medium		: false,
    	large			: false,
    	extraLarge: false
    }

    vm.constraints = angular.extend(vm.sliderValues, {
    	nameFilter: vm.filterByName,
    	sizes: vm.sizes
    });

    $scope.$watch('vm.sliderValues.minValue',(newval) => {
    	vm.constraints.minCapacity = newval;
    });

    $scope.$watch('vm.sliderValues.maxValue',(newval) => {
    	vm.constraints.maxCapacity = newval;
    });

    $scope.$watch('vm.filterByName',(newval) => {
    	vm.constraints.nameFilter = newval.toLowerCase();    	
    });

    $scope.$watch('vm.sizes',(newval) => {
    	vm.constraints.sizes = newval
    },true);
  
  }


  function widgetFilter(){
  	return (items, filterInfo) => {

  		var filtered = [];
  		var sizeFilterChecked = (filterInfo.sizes.small || filterInfo.sizes.medium || filterInfo.sizes.large || filterInfo.sizes.extraLarge);

  		angular.forEach(items, (item) => {
  			if ( 
  			  (item.capacity >= filterInfo.minValue && item.capacity <= filterInfo.maxValue) &&
  				(filterInfo.nameFilter === "" || item.name.toLowerCase().indexOf(filterInfo.nameFilter)!==-1) &&
  				(sizeFilterChecked === false || filterInfo.sizes[item.size] )
  			){
  				filtered.push(item)
  			}
  		})

  		return filtered
  	}
  }

})();
