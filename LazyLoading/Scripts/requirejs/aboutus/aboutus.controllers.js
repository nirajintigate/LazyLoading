
define(['angular',
    './aboutctr/aboutus-aboutctr.controller.js'
],
    function (angular, aboutusController) {
        'use strict';
        var controllers = angular.module('app.systemaboutusController', []);
        controllers.controller(aboutusController.Name, aboutusController);
       
        return controllers;
    }
);