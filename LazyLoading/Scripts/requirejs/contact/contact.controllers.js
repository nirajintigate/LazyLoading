
define(['angular',
    './contctr/contact-contctr.controller.js'
],
    function (angular, contactusController) {
        'use strict';
        var controllers = angular.module('app.systemcontactusController', []);
      //  controllers.controller(contactusController.Name, contactusController);
        controllers.controller(contactusController.Name, contactusController);
       // controllers.require(contactusController).name;

       
        return controllers;
    }
);