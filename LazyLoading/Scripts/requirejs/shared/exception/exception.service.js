define([
    '../logger/logger.service'
], function (LoggerService) {
    'use strict';
    
    ExceptionService.Name = 'ExceptionService';
    ExceptionService.$inject = [LoggerService.Name];
    function ExceptionService(LoggerService) {
        this.catcher = catcher;

        function catcher(message) {
            return function (reason) {
                LoggerService.error(message, reason);
            };
        }
    }

    return ExceptionService;
});