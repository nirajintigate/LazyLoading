define([
    'angular',
    '../logger/logger.module',
    './exception.service'
], function (angular, loggerModule, ExceptionService) {
    'use strict';

    return angular.module('app.shared.exception', [loggerModule.Name])
        .service(ExceptionService.Name, ExceptionService);

});