angular.module('Main', ['selectize'])
.controller('MainCtrl', function($scope, $timeout) {
  $scope.disable = false;



  //=======================================================
  //Angular Form Bindings
  //=======================================================
  $scope.myModel;

  $scope.myOptions = [{value: '1', text: 'Jordy'}];


  $scope.changeOptions = function(){
    $scope.myOptions.push({value: '3', text: 'Kirk'});
  }

  $scope.changeValue = function(){
    $scope.myModel = '2';
  }

  $scope.myConfig = {
    create: true,
    labelField: 'text',
    onChange: function(value){
      console.log('onChange Event', value)
    },
    // maxItems: 1,
    // required: true,
  }


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

  $scope.toggleLabel = function(){
    $scope.myConfig2.labelField = $scope.myConfig2.labelField == 'class' ? 'name' : 'class';
  }

  $scope.myConfig3 = {
    valueField: 'url',
    labelField: 'name',
    searchField: 'name',
    create: false,
    preload: true,
    render: {
        option: function(item, escape) {
            return '<div>' +
                '<span class="title">' +
                    '<span class="name"><i class="icon ' + (item.fork ? 'fork' : 'source') + '"></i>' + escape(item.name) + '</span> ' +
                    '<small class="by">' + escape(item.username) + '</small>' +
                '</span>' +
            '</div>';
        }
    },
    score: function(search) {
        var score = this.getScoreFunction(search);
        return function(item) {
            return score(item) * (1 + Math.min(item.watchers / 100, 1));
        };
    },
    load: function(query, callback) {
      query = query || 'default query';
      $.ajax({
        url: 'https://api.github.com/legacy/repos/search/' + encodeURIComponent(query),
        type: 'GET',
        error: function() {
          callback();
        },
        success: function(res) {
          $scope.myOptions3 = res.repositories;
          // console.log(res.repositories);
          callback(res.repositories);
          // !$scope.$$phase && $scope.$digest();

        }
      });
    }
  };
  $scope.myOptions3 = [];

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
