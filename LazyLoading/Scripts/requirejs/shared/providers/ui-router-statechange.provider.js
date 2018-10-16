define(['uiRouter'], function (uirouter) {
    'use strict';
    uiRouteStateChange.$inject = ['$rootScope', '$http', '$location', '$window', '$state', '$timeout'];
   
    function uiRouteStateChange($rootScope, $http, $location, $window, $state, $timeout) {
        /* Redirect to Dashboard after login..*/
        alert("state change");
        //console.log($location);
        //console.log($location.hash().toLowerCase());
        if ($location.hash().toLowerCase().trim() === "/redirecttodashboard" || $location.hash().toLowerCase().trim() === "redirecttodashboard") {

            $state.go('DashboardRoot'); 
        }
        //


        //$rootScope.$on('$stateChangeStart', function (event, next, current, toState, toParams, fromState, fromParams) {
        //    alert(next.name);
        //    if (next.name === "RedirectToDashboard" || current.name === "RedirectToDashboard") {
        //        event.preventDefault();
        //        $state.go('DashboardRoot');
        //    }
        //});
    };
    return uiRouteStateChange;
}); 