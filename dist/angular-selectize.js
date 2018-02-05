/**
 * Angular Selectize2
 * https://github.com/machineboy2045/angular-selectize
 **/

angular.module('selectize', []).directive("selectize", [function() {

  var isEmpty = function(val) {
    return val === undefined || val === null || !val.length; //support checking empty arrays
  };

  return {
    restrict: 'EA',
    require: '^ngModel',
    scope: { ngModel: '=', config: '=?config', options: '=?options', ngDisabled: '=', ngRequired: '&' },
    link: function(scope, element, attrs, ctrl) {

      function NgSelectize(element){
        var ngs = this;
        ngs.element = element;
        ngs.config = null;
        ngs.isInit = false;


        ngs.refreshValidate = function(){
          var isInvalid = (scope.ngRequired() || attrs.required || ngs.config.required) && isEmpty(scope.ngModel);
          ctrl.$setValidity('required', !isInvalid);
        }

        ngs.refreshOptions = function(options){
          if(!ngs.isInit){
            return;
          }
          ngs.selectize.clearOptions();
          if(options){
            ngs.selectize.addOption(options);
          }
        };

        ngs.onChange = function(){
          if(!ngs.isInit){
            return;
          }

          var value = ngs.selectize.items;
          if (scope.config.maxItems == 1) {
            value = value[0]
          }
          ctrl.$setViewValue(value);

          ngs.refreshValidate();

          ngs.selectize.$control.toggleClass('ng-valid', ctrl.$valid);
          ngs.selectize.$control.toggleClass('ng-invalid', ctrl.$invalid);
          ngs.selectize.$control.toggleClass('ng-dirty', ctrl.$dirty);
          ngs.selectize.$control.toggleClass('ng-pristine', ctrl.$pristine);
        }

        ngs.refreshModel = function(model){
          if(!ngs.isInit){
            return;
          }
          ngs.selectize.setValue(model, true);
        };

        ngs.init = function(config){
          ngs.config = config || {};
          ngs.isInit = true;

          if(ngs.selectize){
            ngs.selectize.destroy();
          }

          ngs.selectize = element.selectize(ngs.config).data('selectize');

          ngs.selectize.on('change', ngs.onChange);

          ngs.refreshOptions(scope.options);
          ngs.refreshModel(scope.ngModel);
          ngs.refreshDisable(scope.ngDisabled);

        };

        ngs.refreshDisable = function(disabled){
          if(!ngs.isInit){
            return;
          }

          disabled ? ngs.selectize.disable() : ngs.selectize.enable();
        }

        ngs.init();
      }

      var ngSelectize = new NgSelectize(element);

      scope.$watch('options', ngSelectize.refreshOptions, true);
      scope.$watch('config', ngSelectize.init, true);
      scope.$watch('ngModel', ngSelectize.refreshModel);
      scope.$watch('ngDisabled', ngSelectize.refreshDisable);

    }
  };
}]);
