angular.module('Main', ['selectize'])
.controller('MainCtrl', function($scope, $timeout) {
  $scope.disable = false;



  //=======================================================
  //Angular Form Bindings
  //=======================================================
  $scope.myModel;

  $scope.myOptions = [{value: '1', text: 'Jordy'}];


  $scope.changeOptions = function(){
    $scope.myOptions = [{value: '1', text: 'Kirk'}];
  }

  $scope.changeValue = function(){
    $scope.myModel = '2';
  }

  $scope.myConfig = {
    create: true,
    labelField: 'name',
    onChange: function(value){
      console.log('onChange', value)
    },
    // maxItems: 1,
    // required: true,
  }


  //simulate async option loading
  $timeout(function(){
    $scope.myOptions.push({value: '2', text: 'Crusher'})
  }, 2000);


  //=======================================================
  //Optgroups
  //=======================================================
  $scope.myConfig2 = {
    // maxItems: 1,
    optgroupField: 'class',
  	labelField: 'name',
  	valueField: 'value',
  	searchField: ['name'],
  	render: {
  		optgroup_header: function(data, escape) {
  			return '<div class="optgroup-header">' + escape(data.label) + ' <span class="scientific">' + escape(data.label_scientific) + '</span></div>';
  		}
  	},
  	optgroups: [
  		{value: 'mammal', label: 'Mammal', label_scientific: 'Mammalia'},
  		{value: 'bird', label: 'Bird', label_scientific: 'Aves'},
  		{value: 'reptile', label: 'Reptile', label_scientific: 'Reptilia'}
  	]
  };

// setTimeout(function(){
//   $scope.myModel3 = ['horse','cat'];
// }, 1000)

  $scope.changeConfig = function(){
    $scope.myConfig2.labelField = 'class';
  }

  $scope.myOptions2 = [
		{class: 'mammal', value: "dog", name: "Dog" },
		{class: 'mammal', value: "cat", name: "Cat" },
		{class: 'mammal', value: "horse", name: "Horse" },
		{class: 'mammal', value: "kangaroo", name: "Kangaroo" },
		{class: 'bird', value: 'duck', name: 'Duck'},
		{class: 'bird', value: 'chicken', name: 'Chicken'},
		{class: 'bird', value: 'ostrich', name: 'Ostrich'},
		{class: 'bird', value: 'seagull', name: 'Seagull'},
		{class: 'reptile', value: 'snake', name: 'Snake'},
		{class: 'reptile', value: 'lizard', name: 'Lizard'},
		{class: 'reptile', value: 'alligator', name: 'Alligator'},
		{class: 'reptile', value: 'turtle', name: 'Turtle'}
	];


});
