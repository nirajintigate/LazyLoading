/// <reference path="contact-contctr.service.js" />
/**
Created by Manoj Rana on 20 Aug 2018.
*/

define([
    'jQuery',
    'jQueryUI',
    'jQueryValidation',
    'angular',
    'bootstrap', 
    '/Scripts/requirejs/contact/contctr/contact-contctr.service.js'
], function ($,
    jQueryUI,
    jQueryValidation,
    angular,
    bootstrap,   
    contactusService   

) {

        var contactusController = function ($scope, $sce, $stateParams, $state, $timeout, $interval, contactusService) {

            alert("Contact us");


            $scope.$on('ocLazyLoad.moduleLoaded', function (e, module) {
                console.log('module name : ', module);
            });


          


        }

        contactusController.Name = 'contactusController';
        contactusController.$inject = ['$scope', "$sce", '$stateParams', '$state', '$timeout', '$interval', contactusService.Name];

        return contactusController;
    });

