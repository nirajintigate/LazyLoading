/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */

//var d = new Date();
//d.setMinutes(1);
//var version = d.getTime();


require.config({
    urlArgs: "v=v.2.1.12",// + new Date().getTime(),
    waitSeconds: 300,
    baseUrl: "/Scripts/requirejs/",
    paths: {
        'domReady': 'lib/requirejs-domready/domReady',      
        'jQuery': 'lib/jquery/jquery-3.3.1',     
        'jQueryUI': 'lib/jquery/jquery-ui-1.12.1.min',
        'angular': 'lib/angular/angular-1.6.5.min',
        'uiRouter': 'lib/angular/angular-ui-router.min',
        'bootstrap': 'lib/jquery/bootstrap',
        'ngSanitize': 'lib/angular/angular-sanitize.min',       
        'jQueryValidationUnobtrasive': 'lib/jquery/jquery.validate.unobtrusive.min',
        'jQueryValidation': 'lib/jquery/jquery.validate.min',
        'lazyload': 'lib/lazyload/ocLazyLoad'
       // 'apiConfig': 'shared/config',
    },

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
        'jQuery': {
            exports: 'jQuery'
        },
        'jQueryUI': {
            exports: 'jQueryUI'
        },
        'angular': {
            exports: 'angular'
        },
        'uiRouter': {
            deps: ['angular']
        },
        'bootstrap': {
            deps: ['jQuery']
        },
        'ngSanitize': {
            exports: 'ngSanitize',
            deps: ['angular']
        },
        'jQueryValidationUnobtrasive': {
            exports: 'jQueryValidationUnobtrasive',
            deps: ['jQuery']
        },
        'jQueryValidation': {
            exports: 'jQueryValidation',
            deps: ['jQuery']
        },
        'lazyload': {
            exports: 'lazyload',
            deps: ['angular']
        }
        //'apiConfig': {
        //    exports: 'apiConfig'
           

        //}
        
    },

    deps: [
        // kick start application... see bootstrap.js
        '/Scripts/RequireJs/bootstrap.js'
    ]

});