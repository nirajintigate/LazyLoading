/**
Created by Manoj Rana on 20 Aug 2018.
*/

define([
    'jQuery',
    'jQueryUI',
    'jQueryValidation',
    'angular',
    'bootstrap',  
    '/Scripts/requirejs/aboutus/aboutctr/aboutus-aboutctr.service.js',
   
], function ($,
    jQueryUI,
    jQueryValidation,
    angular,
    bootstrap,  
    aboutusService
  

) {

        var aboutusController = function ($scope, $sce, $stateParams, $state, $timeout, $interval, aboutusService) {

            $scope.noRecordsFound = false;
            $scope.limit = globalvariables.dataLimit;
            $scope.PageIndex = globalvariables.pageNumber;
            $scope.PageSize = globalvariables.recordsPerPage;

            $scope.BreachedSLAList = [{ "Text": "OnTime", "Value": 1 }, { "Text": "Late", "Value": 2 }];

            alert("Aboutus");

            $scope.$on('ocLazyLoad.moduleLoaded', function (e, module) {
                console.log('module name : ', module);
            });



          


        }

        aboutusController.Name = 'aboutusController';
        aboutusController.$inject = ['$scope', "$sce", '$stateParams', '$state', '$timeout', '$interval', aboutusService.Name];

        return aboutusController;
    });

