 /**
 * Module for users functionalities.
 */
define([
    'angular',
    'uiRouter',
    '/Scripts/requirejs/aboutus/aboutus.services.js',
    '/Scripts/requirejs/aboutus/aboutus.controllers.js'
], function (angular, uirouter, systemaboutusService, systemaboutusController
) {
        'use strict';
        return angular.module('app.systemaboutusManagement', ['ui.router', 'app.systemaboutusService', 'app.systemaboutusController'])
    });