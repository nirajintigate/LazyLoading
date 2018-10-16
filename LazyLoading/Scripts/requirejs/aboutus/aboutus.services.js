
define(['angular',
    './aboutctr/aboutus-aboutctr.service.js'
     //'/Scripts/requirejs/aboutus/aboutctr/aboutus-aboutctr.service.js'
],
    function (angular,
        aboutusService) {
        'use strict';
        var services = angular.module('app.systemaboutusService', []);
        services.service(aboutusService.Name, aboutusService);
        return services;
    }
);