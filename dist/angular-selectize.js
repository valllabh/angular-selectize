/**
 * Angular Selectize2
 * https://github.com/machineboy2045/angular-selectize
 **/

angular.module('selectize', []).directive("selectize", [function() {
  return {
    restrict: 'EA',
    require: '^ngModel',
    scope: { ngModel: '=', config: '=?config', options: '=?', ngDisabled: '=', ngRequired: '&' },
    link: function(scope, element, attrs, modelCtrl) {

      function NgSelectize(element, settings){
        var ngs = this;
        ngs.element = element;
        ngs.settings = settings;
        ngs.isInit = false;

        ngs.refreshOptions = function(options){
          var ngs = this;
          if(!ngs.isInit){
            return;
          }
          ngs.selectize.clearOptions();
          ngs.selectize.addOption(options);
        };

        ngs.refreshModel = function(model){
          var ngs = this;
          if(!ngs.isInit){
            return;
          }

          ngs.selectize.setValue(model, true);
        };

        ngs.init = function(){
          var ngs = this;
          ngs.isInit = true;
          ngs.selectize = element.selectize(ngs.settings).data('selectize');
        };

        ngs.init();
      }

      var ngSelectize = new NgSelectize(element, scope.config);

      scope.$watchCollection('options', ngSelectize.refreshOptions);
      scope.$watch('config', ngSelectize.init, true);
      scope.$watch('ngModel', ngSelectize.refreshModel);

      console.log(ngSelectize);

      // scope.$watch('ngDisabled', ngSelectize.refresh);

      // var selectize, settings;
      //
      // scope.options = scope.options || [];
      // scope.config = scope.config || {};
      //
      // var isEmpty = function(val) {
      //   return val === undefined || val === null || !val.length; //support checking empty arrays
      // };
      //
      // var toggle = function(disabled) {
      //   if(!selectize){
      //     return;
      //   }
      //   disabled ? selectize.disable() : selectize.enable();
      // }
      //
      // var validate = function() {
      //   var isInvalid = (scope.ngRequired() || attrs.required || settings.required) && isEmpty(scope.ngModel);
      //   modelCtrl.$setValidity('required', !isInvalid);
      // };
      //
      // var setConfig = function(){
      //   init();
      // }
      //
      // var setSelectizeOptions = function(curr, prev) {
      //   if(!selectize){
      //     return;
      //   }
      //
      //   selectize.clearOptions();
      //
      //   selectize.addOption(curr, true);
      //
      //   selectize.refreshOptions(false); // updates results if user has entered a query
      //
      //   setSelectizeValue();
      //
      // }
      //
      // var setSelectizeValue = function() {
      //   if(!selectize){
      //     return;
      //   }
      //
      //   validate();
      //
      //   console.log(new Error('x'));
      //   selectize.$control.toggleClass('ng-valid', modelCtrl.$valid);
      //   selectize.$control.toggleClass('ng-invalid', modelCtrl.$invalid);
      //   selectize.$control.toggleClass('ng-dirty', modelCtrl.$dirty);
      //   selectize.$control.toggleClass('ng-pristine', modelCtrl.$pristine);
      //
      //   if (!angular.equals(selectize.items, scope.ngModel)) {
      //     selectize.setValue(scope.ngModel, true);
      //   }
      // }
      //
      // var getSettings = function(){
      //
      //   var settings = angular.extend({}, Selectize.defaults, scope.config);
      //
      //   settings.onChange = function(value) {
      //
      //     var value = angular.copy(selectize.items);
      //
      //     if (settings.maxItems == 1) {
      //       value = value[0]
      //     }
      //     modelCtrl.$setViewValue( value );
      //
      //     if (scope.config.onChange) {
      //       scope.config.onChange.apply(this, arguments);
      //     }
      //   };
      //
      //   settings.onOptionAdd = function(value, data) {
      //     if( scope.options.indexOf(data) === -1 ) {
      //       scope.options.push(data);
      //
      //       if (scope.config.onOptionAdd) {
      //         scope.config.onOptionAdd.apply(this, arguments);
      //       }
      //     }
      //   };
      //
      //   settings.onInitialize = function() {
      //     selectize = element[0].selectize;
      //
      //     setSelectizeOptions(scope.options);
      //
      //     //provides a way to access the selectize element from an
      //     //angular controller
      //     if (scope.config.onInitialize) {
      //       scope.config.onInitialize(selectize);
      //     }
      //
      //   };
      //
      //
      //   return settings;
      // }
      //
      // function init(){
      //   settings = getSettings();
      //
      //   if(selectize){
      //     selectize.destroy();
      //   }
      //
      //   var old_model = angular.copy(scope.ngModel);
      //
      //   setTimeout(function(){
      //     scope.ngModel = old_model;
      //     scope.$$phase && scope.$digest();
      //   }, 500);
      //
      //   element.selectize(settings);
      //
      // }
      //
      // init();
      //
      // scope.$watchCollection('options', setSelectizeOptions);
      // scope.$watch('config', setConfig, true);
      // scope.$watch('ngModel', setSelectizeValue);
      // scope.$watch('ngDisabled', toggle);
      //
      // element.on('$destroy', function() {
      //   if (selectize) {
      //     selectize.destroy();
      //     element = null;
      //   }
      // });
    }
  };
}]);
