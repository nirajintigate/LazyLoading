define([], function(){
    'use strict';
    
    LoggerService.Name = 'LoggerService';
    LoggerService.$inject = ['$log'];
    function LoggerService($log){
        this.error = error;
        this.info = info;
        this.warning = warning;
        this.success = success;
        
        function error(message, data) {
            $log.error('Error: ' + message, data);
        }

        function info(message, data) {
            $log.info('Info: ' + message, data);
        }

        function success(message, data) {
            $log.info('Success: ' + message, data);
        }

        function warning(message, data) {
            $log.warn('Warning: ' + message, data);
        }
    }
    
    return LoggerService;
})