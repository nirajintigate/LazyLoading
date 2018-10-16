/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */
define(['./app'], function (app
) {
    'use strict';
    return app.config(function ($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/home/index',
            })
            //.state('contactus', {
            //    url: '/home/Contact',
            //})
            //.state('aboutus', {
            //    url: '/home/About',
            //})



            .state('contactus', {
                url: "/contactus",
                views: {
                    "": {
                        templateUrl: "/home/Contact"
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('app.systemcontactusManagement'); // Resolve promise and load before view 
                    }]
                }
            })
            .state('aboutus', {
                url: "/aboutus",
                views: {
                    "": {
                        templateUrl: "/home/About"
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('app.systemaboutusManagement'); // Resolve promise and load before view 
                    }]
                }
            });




    })
});