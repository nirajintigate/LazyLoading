
/**
 * Module for users functionalities.
 */
define([
    'angular',
    'uiRouter',
    '/Scripts/requirejs/contact/contact.services.js',
    '/Scripts/requirejs/contact/contact.controllers.js'
], function (angular, uirouter, systemcontactusService, systemcontactusController
) {
        'use strict';
        return angular.module('app.systemcontactusManagement', ['ui.router', 'app.systemcontactusService', 'app.systemcontactusController'])
    });