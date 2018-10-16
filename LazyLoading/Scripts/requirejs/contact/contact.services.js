
define(['angular',
    './contctr/contact-contctr.service.js'
],
    function (angular,
        contactusService) {
        'use strict';
        var services = angular.module('app.systemcontactusService', []);
        services.service(contactusService.Name, contactusService);
        return services;
    }
);