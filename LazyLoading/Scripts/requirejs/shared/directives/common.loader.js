/**
 * Main App Module
 */

define([
    'angular',
    'jQuery',
    'apiConfig'
], function (angular, $, apiConfig) {
    'use strict';
    //------------------------------------------------------------------------
    GlobalAjaxInterceptor.$inject = ["$q", "$rootScope", "$timeout"];
    function GlobalAjaxInterceptor($q, $rootScope, $timeout) {


        var currentRequests = { http: {}, ajax: {} };
        function addHttpRequest(conf) {
            currentRequests.http[conf.url] = conf.promiseObj;
        }
        function addAjaxRequest(conf) {
            currentRequests.ajax[conf.url] = conf.promiseObj;
        }
        function abortAllHttpRequests(httpRequests) {
            angular.forEach(httpRequests, function (promise, url) {
                promise && promise.resolve();
            });
        }
        function abortAllAjaxRequests(ajaxRequests) {
            angular.forEach(ajaxRequests, function (xhr, url) {
                xhr && xhr.abort();
            });
        }
        function abortAllOldRequests() {
            var oldRequests = angular.copy(currentRequests);
            currentRequests = {
                http: {},
                ajax: {}
            };
            abortAllHttpRequests(oldRequests.http);
            abortAllAjaxRequests(oldRequests.ajax);
        }

        $(document).ajaxSend(function (event, xhr, options) {
            addAjaxRequest({ url: options.url, promiseObj: xhr });
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

            abortAllOldRequests();

            $timeout(function () {
                try {
                    if ($(".table_min")) {
                        var grdsctop = parseInt($(".table_min").offset().top);
                        var grdfootheight = $(".GridFooter").length > 0 ? parseInt($(".GridFooter").height()) : 0;

                        var dochght = $(window).height();

                        if (grdsctop === undefined || grdsctop === null) {
                            grdsctop = 0;
                        }
                        if (grdfootheight === undefined || grdfootheight === null) {
                            grdfootheight = 0;
                        }
                        if (dochght === undefined || dochght === null) {
                            dochght = 0;
                        }
                        var grdhght = dochght - (grdsctop + grdfootheight + 52);
                        //alert(grdhght);
                        $(".table_min").height(grdhght);
                    }
                }
                catch (e) { }
            }, 100);

            $timeout(function () {

                // Internet Explorer 6-11
                var isIE = /*@cc_on!@*/false || !!document.documentMode;


                try {
                    if ($(".table_minnw.newscroll") ) {                        
                        var grdsctop = parseInt($(".table_minnw.newscroll table.table tbody").offset().top);
                        var grdfootheight = $(".GridFooter").length > 0 ? parseInt($(".GridFooter").height()) : 0;
                        var dochght = $(window).height();
                        if (grdsctop === undefined || grdsctop === null) {
                            grdsctop = 0;
                        }
                        if (grdfootheight === undefined || grdfootheight === null) {
                            grdfootheight = 0;
                        }
                        if (dochght === undefined || dochght === null) {
                            dochght = 0;
                        }
                        var grdhght = dochght - (grdsctop + grdfootheight + 80);
                        $(".table_minnw.newscroll table.table tbody").height(grdhght);
                    }
                }
                catch (e) { }
            }, 100);

            /*For navigation menu*/

            $timeout(function () { ActiveNavigationMenu(); }, 100);

           

        });

        return {
            // On request success
            request: function (config) {
                var deferred = $q.defer();
                config.timeout = deferred.promise;
                addHttpRequest({ url: config.url, promiseObj: deferred });
                return config;
            },
            // On request failure
            requestError: function (rejection) {
                // Return the promise rejection.
                return $q.reject(rejection);
            },
            // On response success
            response: function (response) {
                // Return the response or promise.
                return response || $q.when(response);
            },
            // On response failture
            responseError: function (rejection) {
                // Return the promise rejection.
                return $q.reject(rejection);
            }
        };
    };
    //------------------------------------------------------------------------
    httpInterceptor.$inject = ["$q", "$rootScope", "$log"];
    function httpInterceptor($q, $rootScope, $log) {
        var numLoadings = 0;

        var _apiPrefix = apiConfig.apiEndPoint;
        var requestsToBeBlocked = [
            //_apiPrefix + "rolemanagement/saverole",
            //_apiPrefix + "rolemanagement/getroles",
            //_apiPrefix + "rolemanagement/setroleprivileges",
            //_apiPrefix + "shareddataservice/bindcountry",
            //_apiPrefix + "shareddataservice/getstates",
            //_apiPrefix + "shareddataservice/getcities",
            //_apiPrefix + "cmspages/getcmspagesrecords",
            //_apiPrefix + "cmspages/savecmspagesdata",
            //_apiPrefix + "faqmanagement/getallfaqrecords",
            //_apiPrefix + "faqmanagement/savefaqlist",
            //_apiPrefix + "emailtemplate/updateemailtemplate",
            //_apiPrefix + "usersmanagement/saveuser",
            //_apiPrefix + "usersmanagement/updateuserdetails",

            "/rolemanagement/saverole",
            "/rolemanagement/getroles",
            "/rolemanagement/setroleprivileges",
            "/shareddataservice/bindcountry",
            "/shareddataservice/getstates",
            "/shareddataservice/getcities",
            "/cmspages/getcmspagesrecords",
            "/cmspages/savecmspagesdata",
            "/faqmanagement/getallfaqrecords",
            "/faqmanagement/savefaqlist",
            "/emailtemplate/updateemailtemplate",
            "/usersmanagement/saveuser",
            "/usersmanagement/updateuserdetails",

        ];


        var requestsToTotalCountJobOrder = [
            "/JobOrder/JobOrder/Index",
            "/JobOrder/JobOrder/JobOrderDetails",
            "/JobOrder/JobOrder/CompletedTickets",
            "/JobOrder/JobOrder/CompletedTicketsDetails",
            "/JobOrder/JobOrder/OpenTickets",
            "/JobOrder/JobOrder/OpenTicketsDetails",
            "/JobOrder/JobOrder/TicketAnalitics",
            "/JobOrder/JobOrder/AskQuotation",
            "/JobOrder/JobOrder/ReceivedQuotation",
            "/JobOrder/JobOrder/AskQuotationDetails",
            "/JobOrder/JobOrder/ReceivedQuotationDetails",
            "/JobOrder/Dashboard/SettingJobOrderDash",
        ];

        return {
            request: function (config) {
                numLoadings++;
                /* Show loader.......*/

                //console.log(config.url.toLowerCase());
                //console.log(requestsToBeBlocked.indexOf(config.url.toLowerCase()));
                if (requestsToBeBlocked.indexOf(config.url.toLowerCase()) === -1) {
                    $rootScope.$broadcast("loader_show");
                }


                if (requestsToTotalCountJobOrder.indexOf(config.url) !== -1) {
                    $rootScope.$broadcast("JobOrderCount");
                }

                return config || $q.when(config)
            },
            response: function (response) {
                if (response.data === "sessionexp") {
                    window.location.href = "/Account/Login";
                }

                if ((--numLoadings) === 0) {
                    // Hide loader
                    $rootScope.$broadcast("loader_hide");

                }
                return response || $q.when(response);
            },
            responseError: function (response) {

                if (!(--numLoadings)) {
                    // Hide loader
                    $rootScope.$broadcast("loader_hide");
                }

                return $q.reject(response);
            }
        };
    };
    //------------------------------------------------------------------------
    configureInterceptor.$inject = ["$httpProvider"];
    function configureInterceptor($httpProvider) {
        //initialize get if not there
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        //// Answer edited to include suggestions from comments
        //// because previous version of code introduced browser-related errors

        //disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';

        // extra
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
        $httpProvider.useApplyAsync(true);
        $httpProvider.interceptors.push('GlobalAjaxInterceptor');
        $httpProvider.interceptors.push('httpInterceptor');
    };
    //------------------------------------------------------------------------
    var commonLoader = angular.module('app.common.loader', [])
        .factory('GlobalAjaxInterceptor', GlobalAjaxInterceptor)
        .factory('httpInterceptor', httpInterceptor)
        .config(configureInterceptor)
        .directive("loader", function ($rootScope) {
            'use strict';
            var loader = function ($scope, element, attrs) {
                $scope.$on("loader_show", function () {
                    return $(element).show();
                });
                return $scope.$on("loader_hide", function () {
                    return $(element).hide();
                });
            };
            return loader;
        })
    //------------------------------------------------------------------------   
    return commonLoader;


    /**************************Active navigation menu**********************************/
    function ActiveNavigationMenu() {

        var locationUrl = window.location.href.toLowerCase();

        /**Audit visit section**/

        if (locationUrl.indexOf("bmsauditvisitsettingdata") != -1) {
            //document.getElementById('ScheduleVisits').classList.remove("active");
            //document.getElementById('AuditVisits').classList.remove("active");
            //document.getElementById('VisitsAnalysis').classList.remove("active");


            $('#ScheduleVisits').removeClass("active");
            $('#AuditVisits').removeClass("active");
            $('#VisitsAnalysis').removeClass("active");



        }
        else if (locationUrl.indexOf("schedulevisit") != -1) {
            //document.getElementById('ScheduleVisits').classList.add("active");
            //document.getElementById('AuditVisits').classList.remove("active");
            //document.getElementById('VisitsAnalysis').classList.remove("active");

            $('#ScheduleVisits').addClass("active");
            $('#AuditVisits').removeClass("active");
            $('#VisitsAnalysis').removeClass("active");

        }
        else if (locationUrl.indexOf("!/auditvisit") != -1 || locationUrl.indexOf("auditvisitdetails") != -1 || locationUrl.indexOf("itemdetails") != -1) {

            //document.getElementById('AuditVisits').classList.add("active");
            //document.getElementById('ScheduleVisits').classList.remove("active");
            //document.getElementById('VisitsAnalysis').classList.remove("active");


            $('#AuditVisits').addClass("active");
            $('#ScheduleVisits').removeClass("active");
            $('#VisitsAnalysis').removeClass("active");


        }
        else if (locationUrl.indexOf("visitanalysis") != -1) {

            //document.getElementById('VisitsAnalysis').classList.add("active");
            //document.getElementById('AuditVisits').classList.remove("active");
            //document.getElementById('ScheduleVisits').classList.remove("active");


            $('#VisitsAnalysis').addClass("active");
            $('#AuditVisits').removeClass("active");
            $('#ScheduleVisits').removeClass("active");


        }

        /*Job order section */


        else if (locationUrl.indexOf("bmsjobordersettingdata") != -1) {
            //document.getElementById('NewJobOrder').classList.remove("active");
            //document.getElementById('OpenJobOrder').classList.remove("active");
            //document.getElementById('CloseJobOrder').classList.remove("active");
            //document.getElementById('JobOrderAnalytics').classList.remove("active");
            //document.getElementById('AskQuotation').classList.remove("active");
            //document.getElementById('ReceiveQuotation').classList.remove("active");


            $('#NewJobOrder').removeClass("active");
            $('#OpenJobOrder').removeClass("active");
            $('#CloseJobOrder').removeClass("active");
            $('#JobOrderAnalytics').removeClass("active");
            $('#AskQuotation').removeClass("active");
            $('#ReceiveQuotation').removeClass("active");


        }

        else if (locationUrl.indexOf("ticketsjoborder") != -1 || locationUrl.indexOf("joborderdetails") != -1) {
            //document.getElementById('NewJobOrder').classList.add("active");
            //document.getElementById('OpenJobOrder').classList.remove("active");
            //document.getElementById('CloseJobOrder').classList.remove("active");
            //document.getElementById('JobOrderAnalytics').classList.remove("active");
            //document.getElementById('AskQuotation').classList.remove("active");
            //document.getElementById('ReceiveQuotation').classList.remove("active");


            $('#NewJobOrder').addClass("active");
            $('#OpenJobOrder').removeClass("active");
            $('#CloseJobOrder').removeClass("active");
            $('#JobOrderAnalytics').removeClass("active");
            $('#AskQuotation').removeClass("active");
            $('#ReceiveQuotation').removeClass("active");


        }
        else if (locationUrl.indexOf("opentickets") != -1 || locationUrl.indexOf("openticketsdetails") != -1) {
            //document.getElementById('OpenJobOrder').classList.add("active");
            //document.getElementById('NewJobOrder').classList.remove("active");
            //document.getElementById('CloseJobOrder').classList.remove("active");
            //document.getElementById('JobOrderAnalytics').classList.remove("active");
            //document.getElementById('AskQuotation').classList.remove("active");
            //document.getElementById('ReceiveQuotation').classList.remove("active");

            $('#OpenJobOrder').addClass("active");
            $('#NewJobOrder').removeClass("active");
            $('#CloseJobOrder').removeClass("active");
            $('#JobOrderAnalytics').removeClass("active");
            $('#AskQuotation').removeClass("active");
            $('#ReceiveQuotation').removeClass("active");

        }
        else if (locationUrl.indexOf("completedtickets") != -1 || locationUrl.indexOf("completedticketsdetails") != -1) {
            //document.getElementById('CloseJobOrder').classList.add("active");
            //document.getElementById('OpenJobOrder').classList.remove("active");
            //document.getElementById('NewJobOrder').classList.remove("active");
            //document.getElementById('JobOrderAnalytics').classList.remove("active");
            //document.getElementById('AskQuotation').classList.remove("active");
            //document.getElementById('ReceiveQuotation').classList.remove("active");

            $('#CloseJobOrder').addClass("active");
            $('#OpenJobOrder').removeClass("active");
            $('#NewJobOrder').removeClass("active");
            $('#JobOrderAnalytics').removeClass("active");
            $('#AskQuotation').removeClass("active");
            $('#ReceiveQuotation').removeClass("active");
        }
        else if (locationUrl.indexOf("ticketanalytics") != -1) {
            //document.getElementById('JobOrderAnalytics').classList.add("active");
            //document.getElementById('CloseJobOrder').classList.remove("active");
            //document.getElementById('OpenJobOrder').classList.remove("active");
            //document.getElementById('NewJobOrder').classList.remove("active");
            //document.getElementById('AskQuotation').classList.remove("active");
            //document.getElementById('ReceiveQuotation').classList.remove("active");

            $('#JobOrderAnalytics').addClass("active");
            $('#CloseJobOrder').removeClass("active");
            $('#OpenJobOrder').removeClass("active");
            $('#NewJobOrder').removeClass("active");
            $('#AskQuotation').removeClass("active");
            $('#ReceiveQuotation').removeClass("active");

        }
        else if (locationUrl.indexOf("askquotation") != -1 || locationUrl.indexOf("askquotationdetails") != -1) {
            //document.getElementById('AskQuotation').classList.add("active");
            //document.getElementById('JobOrderAnalytics').classList.remove("active");
            //document.getElementById('CloseJobOrder').classList.remove("active");
            //document.getElementById('OpenJobOrder').classList.remove("active");
            //document.getElementById('NewJobOrder').classList.remove("active");
            //document.getElementById('ReceiveQuotation').classList.remove("active");

            $('#AskQuotation').addClass("active");
            $('#JobOrderAnalytics').removeClass("active");
            $('#CloseJobOrder').removeClass("active");
            $('#OpenJobOrder').removeClass("active");
            $('#NewJobOrder').removeClass("active");
            $('#ReceiveQuotation').removeClass("active");

        }
        else if (locationUrl.indexOf("receivedquotation") != -1 || locationUrl.indexOf("receivedquotationdetails") != -1) {
            //document.getElementById('ReceiveQuotation').classList.add("active");
            //document.getElementById('JobOrderAnalytics').classList.remove("active");
            //document.getElementById('CloseJobOrder').classList.remove("active");
            //document.getElementById('OpenJobOrder').classList.remove("active");
            //document.getElementById('NewJobOrder').classList.remove("active");
            //document.getElementById('AskQuotation').classList.remove("active");


            $('#ReceiveQuotation').addClass("active");
            $('#JobOrderAnalytics').removeClass("active");
            $('#CloseJobOrder').removeClass("active");
            $('#OpenJobOrder').removeClass("active");
            $('#NewJobOrder').removeClass("active");
            $('#AskQuotation').removeClass("active");


        }

        /***************** Syatem Analytics ************************/
        else if (locationUrl.indexOf("bmssystemanalyticsdata") != -1) {
           
            $('#idAuditVisits').removeClass("active");
            $('#idJobOrders').removeClass("active");
            $('#idJobOrderItems').removeClass("active");
            $('#idJobOrderAreas').removeClass("active");
            $('#idJobOrderBranches').removeClass("active");
            $('#idJobOrderAging').removeClass("active");

        }

        else if (locationUrl.indexOf("systemauditvisits") != -1) {
            
            $('#idAuditVisits').addClass("active");
            $('#idJobOrders').removeClass("active");
            $('#idJobOrderItems').removeClass("active");
            $('#idJobOrderAreas').removeClass("active");
            $('#idJobOrderBranches').removeClass("active");
            $('#idJobOrderAging').removeClass("active");

        }
        else if (locationUrl.indexOf("joborders") != -1) {
            
            $('#idAuditVisits').removeClass("active");
            $('#idJobOrders').addClass("active");
            $('#idJobOrderItems').removeClass("active");
            $('#idJobOrderAreas').removeClass("active");
            $('#idJobOrderBranches').removeClass("active");
            $('#idJobOrderAging').removeClass("active");

        }
        else if (locationUrl.indexOf("joborderitems") != -1) {

            $('#idAuditVisits').removeClass("active");
            $('#idJobOrders').removeClass("active");
            $('#idJobOrderItems').addClass("active");
            $('#idJobOrderAreas').removeClass("active");
            $('#idJobOrderBranches').removeClass("active");
            $('#idJobOrderAging').removeClass("active");

        }
        else if (locationUrl.indexOf("joborderareas") != -1) {

            $('#idAuditVisits').removeClass("active");
            $('#idJobOrders').removeClass("active");
            $('#idJobOrderItems').removeClass("active");
            $('#idJobOrderAreas').addClass("active");
            $('#idJobOrderBranches').removeClass("active");
            $('#idJobOrderAging').removeClass("active");

        }
        else if (locationUrl.indexOf("joborderbranches") != -1) {

            $('#idAuditVisits').removeClass("active");
            $('#idJobOrders').removeClass("active");
            $('#idJobOrderItems').removeClass("active");
            $('#idJobOrderAreas').removeClass("active");
            $('#idJobOrderBranches').addClass("active");
            $('#idJobOrderAging').removeClass("active");

        }
        else if (locationUrl.indexOf("joborderaging") != -1) {
          
            $('#idAuditVisits').removeClass("active");
            $('#idJobOrders').removeClass("active");
            $('#idJobOrderItems').removeClass("active");
            $('#idJobOrderAreas').removeClass("active");
            $('#idJobOrderBranches').removeClass("active");
            $('#idJobOrderAging').addClass("active");

        }


    }



    function CheckBrowserType() {





        // Opera 8.0+ m 
        var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

        // Firefox 1.0+
        var isFirefox = typeof InstallTrigger !== 'undefined';

        // Safari 3.0+ "[object HTMLElementConstructor]" 
        var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

        // Internet Explorer 6-11
        var isIE = /*@cc_on!@*/false || !!document.documentMode;

        // Edge 20+
        var isEdge = !isIE && !!window.StyleMedia;

        // Chrome 1+
        var isChrome = !!window.chrome && !!window.chrome.webstore;

        // Blink engine detection
        var isBlink = (isChrome || isOpera) && !!window.CSS;
        
    }
});