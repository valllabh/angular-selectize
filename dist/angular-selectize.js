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

      var selectize, settings;

      scope.options = scope.options || [];
      scope.config = scope.config || {};

      var isEmpty = function(val) {
        return val === undefined || val === null || !val.length; //support checking empty arrays
      };

      var toggle = function(disabled) {
        if(!selectize){
          return;
        }
        disabled ? selectize.disable() : selectize.enable();
      }

      var validate = function() {
        var isInvalid = (scope.ngRequired() || attrs.required || settings.required) && isEmpty(scope.ngModel);
        modelCtrl.$setValidity('required', !isInvalid);
      };

      var setConfig = function(){
        init();
      }

      var setSelectizeOptions = function(curr, prev) {
        if(!selectize){
          return;
        }

        selectize.clearOptions();

        // angular.forEach(prev, function(opt){
        //   if(curr.indexOf(opt) === -1){
        //     var value = opt[settings.valueField];
        //     selectize.removeOption(value, true);
        //   }
        // });

        selectize.addOption(curr, true);

        selectize.refreshOptions(false); // updates results if user has entered a query

        setSelectizeValue();

      }

      var setSelectizeValue = function() {
        if(!selectize){
          return;
        }

        validate();

        selectize.$control.toggleClass('ng-valid', modelCtrl.$valid);
        selectize.$control.toggleClass('ng-invalid', modelCtrl.$invalid);
        selectize.$control.toggleClass('ng-dirty', modelCtrl.$dirty);
        selectize.$control.toggleClass('ng-pristine', modelCtrl.$pristine);

        if (!angular.equals(selectize.items, scope.ngModel)) {
          selectize.setValue(scope.ngModel, true);
        }
      }

      var getSettings = function(){

        var settings = angular.extend({}, Selectize.defaults, scope.config);

        settings.onChange = function(value) {
          var value = angular.copy(selectize.items);

          if (settings.maxItems == 1) {
            value = value[0]
          }
          modelCtrl.$setViewValue( value );

          if (scope.config.onChange) {
            scope.config.onChange.apply(this, arguments);
          }
        };

        settings.onOptionAdd = function(value, data) {
          if( scope.options.indexOf(data) === -1 ) {
            scope.options.push(data);

            if (scope.config.onOptionAdd) {
              scope.config.onOptionAdd.apply(this, arguments);
            }
          }
        };

        settings.onInitialize = function() {
          selectize = element[0].selectize;

          setSelectizeOptions(scope.options);

          //provides a way to access the selectize element from an
          //angular controller
          if (scope.config.onInitialize) {
            scope.config.onInitialize(selectize);
          }

        };


        return settings;
      }

      function init(){
        settings = getSettings();
        if(selectize){
          selectize.destroy();
        }

        settings.items = angular.copy(scope.ngModel);

        element.selectize(settings);
      }

      init();

      scope.$watchCollection('options', setSelectizeOptions);
      scope.$watch('config', setConfig, true);
      scope.$watch('ngModel', setSelectizeValue);
      scope.$watch('ngDisabled', toggle);

      element.on('$destroy', function() {
        if (selectize) {
          selectize.destroy();
          element = null;
        }
      });
    }
  };
}]);
