/**
 * Module containing common functionalities that can be shared with other modules.
 */

define([
    'app',
    'angular',   
   // '/Content/js/assets/shared/shared.services.js',
    '/Scripts/RequireJs/shared/providers/ui-router-statechange.provider.js',
], function (app,angular,
    //exceptionModule, loggerModule, baseServiceFactory,
    //sharedServices,
    uiRouterStatechangeProvider
) {
    'use strict';
    return angular.module('app.shared', [
        //'app.SharedService'
    ]).run(uiRouterStatechangeProvider);
    });