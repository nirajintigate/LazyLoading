

/**
* Main App Module
*/

define([
    'angular'
    ,'uiRouter' 
    ,'lazyload'
    ,'/Scripts/RequireJs/contact/contact.module.js'
    //'/Scripts/RequireJs/aboutus/aboutus.module.js'
    // '/Scripts/RequireJs/shared/shared.module.js'

], function (angular
    ,uiRouter  
    ,lazyload 
    ,contact
   // aboutus
   // sharedModule
       
   
) {

        'use strict';
        var registeredApp = angular.module('app', [
            /* 3rd-party modules */
            'ui.router'
            ,'oc.lazyLoad'
           , contact.name
           // aboutus.name
            //, sharedModule.name               
         
        ]).config(["$controllerProvider", "$provide",
            "$filterProvider", "$compileProvider", '$ocLazyLoadProvider', function ($controllerProvider, $provide, $filterProvider, $compileProvider, $ocLazyLoadProvider) {
            /*Creating a more synthesized form of service of $ controllerProvider.register*/
            //registeredApp.registerCtrl = $controllerProvider.register;  


            registeredApp.registerController = $controllerProvider.register; //for controllers
            registeredApp.registerService = $provide.service; //for services
            registeredApp.registerFilter = $filterProvider.register; //for filters
            registeredApp.registerDirective = $compileProvider.directive; //for directives
            registeredApp.registerFactory = $provide.factory; //for factory




            $ocLazyLoadProvider.config({
                // options
                debug: true,
                events: true,

                'modules': [{ // Set modules initially
                    name: 'app.systemcontactusManagement', // contact us module
                    files: ['/Scripts/requirejs/contact/contact.module.js']
                }, {
                        name: 'app.systemaboutusManagement', // about us  module
                        files: ['/Scripts/requirejs/aboutus/aboutus.module.js']
                }]

            });

 

        }]);

        return registeredApp;
    });

