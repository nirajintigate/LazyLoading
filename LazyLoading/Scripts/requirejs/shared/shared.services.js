define(['angular',
    './providers/list.service.js'],
    function (angular, listService) {
        var services = angular.module('app.SharedService', []);
        services.service(listService.Name, listService); 
        return services;
    }
);