/**
Created by Anil Ghildiyal on 8 June 2018.
*/
define(['apiConfig'], function (apiConfig) {

    var listservices = function ($http) {
        // all dropdown

        var _apiPrefix = apiConfig.apiEndPoint;
        this.GetDropDownListByText = function (param, cascadeIds, options) {
            switch (param) {

                case "GetDashboardUpdates":
                    return $http({
                        method: "GET",
                        url: "/cpanel/getdashboardviewmodel"
                    });

                case "GetCmsPageTypeList":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetCmsPageTypeList"
                    });

                case "GetFaqTypeList":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetFaqList"
                    });

                case "EmailTemplates":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetEmailTemplates"
                    });

                case "CommanEmailKeys":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetCommanEmailKeys"
                    });

                case "RoleType":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetAllRole",
                        params: { CompanyId: cascadeIds }
                    });

                case "SharedStatus":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/SharedStatus"
                    });

                case "BindCountry":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/BindCountry"
                    });

                case "BindCity":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/BindCity"
                    });

                case "BindState":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/BindState"
                    });

                case "GetStates":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetStates",
                        params: { countryId: cascadeIds }
                    });

                case "GetCities":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetCities",
                        params: { stateId: cascadeIds }
                    });
                case "GetDictionaryTableCategoryList":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetDictionaryTableCategoryList"
                    });


                case "GetGovernorateList":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetGovernorateList"
                    });

                case "GetRegionList":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetRegionList"
                    });


                case "GetAreaList":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetAreaList",
                        params: { GoveronateId: cascadeIds }
                    });

                case "GetCompanyList":
                    return $http({
                        method: "GET",                       
                        url: "/shareddataservice/GetDropdownList?Id=0&Flag=GetCompany",

                    });

                case "GetDepartmentList":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetDepartmentList",
                        params: { CompanyId: cascadeIds }
                    });


                case "GetAssignedDepartmentList":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetAssignedDepartmentList",
                        params: { CompanyId: cascadeIds, DepartmentId: options}
                    });


                case "GetCriticalityList":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetCriticalityList",

                    });

                case "GetSLAList":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetSLAList",

                    });

                case "GetAuditorList":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetDropdownList?Id=0&Flag=GetAuditor",

                    });
                case "GetPeriodList":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetDropdownList?Id=0&Flag=GetVisitPeriod",

                    });
                case "GetBranchList":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetDropdownList?Id=" + cascadeIds + "&Flag=GetBranch",

                    });

                case "GetLocationList":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetLocationList",

                    });
                case "GetVisitType":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetDropdownList?Id=0&Flag=GetVisitType",

                    });
                case "GetCategory":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetDropdownList?Id=0&Flag=GetCategory",

                    });
                case "GetTicketStatus":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetDropdownList?Id=0&Flag=GetTicketStatus",

                    });

                case "GetTicketStatus_Visit":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetDropdownList?Id=0&Flag=GetTicketStatus_Visit",

                    });

                case "GetOpenTicketStatus_JobOrder":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetDropdownList?Id=0&Flag=GetOpenTicketStatus_JobOrder",

                    });

                case "GetClosedTicketStatus_JobOrder":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetDropdownList?Id=0&Flag=GetClosedTicketStatus_JobOrder",

                    });

                case "GetNewTicketStatus_JobOrder":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetDropdownList?Id=0&Flag=GetNewTicketStatus_JobOrder",

                    });

                case "GetTechnician":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetTechnicianDropdownList?Id=" + cascadeIds + "&Flag=GetTechnician&OptionId=" + options,

                    });

                case "GetTechnicianByDepartmentAndRole":

                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetTechnicianDropdownList?Id=" + cascadeIds + "&Flag=GetTechnicianByDepartmentAndRole&OptionId=" + options,

                    });
                case "GetTicketType":

                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetDropdownList?Id=" + cascadeIds + "&Flag=GetTicketType&Id=" + cascadeIds,

                    });

                case "GetAllUser":

                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetDropdownList?Id=" + cascadeIds + "&Flag=GetAllUser&Id=" + cascadeIds,

                    });
                case "GetCompanyWithoutOwner":
                    return $http({
                        method: "GET",                       
                        url: "/shareddataservice/GetDropdownList?Id=0&Flag=GetCompanyWithoutOwner",

                    });

               
                case "GetAllCompanyList":
                    return $http({
                        method: "GET",
                       
                        url: "/shareddataservice/GetDropdownList?Id=0&Flag=GetAllCompanyList",

                    });
                    
                    
                case "GetAllActionsList":
                    return $http({
                        method: "GET",
                        
                        url: "/shareddataservice/GetDropdownList?Id=0&Flag=GetAllActionsList",

                    });

                case "GetItems":
                    return $http({
                        method: "GET",
                      
                        url: "/shareddataservice/GetDropdownList?Id=" + cascadeIds + "&Flag=GetItems",

                    });
                    
                case "GetLocation":
                    return $http({
                        method: "GET",
                       
                        url: "/shareddataservice/GetDropdownList?Flag=GetLocation",

                    });

                case "GetVisitItems":
                    return $http({
                        method: "GET",
                        
                        url: "/shareddataservice/GetDropdownList?Id=" + cascadeIds + "&Flag=GetVisitItems&OptionId=" + options,

                    });
                case "GetAuditVisitItemStatus":
                    return $http({
                        method: "GET",
                        
                        url: "/shareddataservice/GetDropdownList?Id=" + cascadeIds + "&Flag=GetAuditVisitItemStatus",

                    });

                case "GetEscalation":
                    return $http({
                        method: "GET",
                        
                        url: "/shareddataservice/GetDropdownList?Flag=GetEscalation",

                    });

                case "GetEscalationCCmail":
                    return $http({
                        method: "GET",
                        
                        url: "/shareddataservice/GetDropdownList?Id=" + cascadeIds + "&Flag=GetEscalationCCmail",

                    });

                case "GetJobOrderSearchByCompany":
                    return $http({
                        method: "GET",

                        url: "/shareddataservice/GetDropdownList?Flag=GetJobOrderSearchByCompany",

                    });

                case "GetJobOrderDepartmentSearchByCompanyWihRole":
                    return $http({
                        method: "GET",
                        url: "/shareddataservice/GetDropdownList?Flag=GetJobOrderDepartmentSearchByCompanyWihRole&Id=" + cascadeIds,

                    });


                case "GetAnalyticsMenu":
                    return $http({
                        method: "GET",

                        url: "/shareddataservice/GetDropdownList?Flag=GetAnalyticsMenu",

                    });

                case "GetAnalyticsSubMenu":
                    return $http({
                        method: "GET",

                        url: "/shareddataservice/GetDropdownList?Id=" + cascadeIds + "&Flag=GetAnalyticsSubMenu",

                    });
                    

                ////////////////////////////////////////////////////
            };
        };
    };
    listservices.Name = 'listService';
    listservices.$inject = ['$http'];
    return listservices;

});

