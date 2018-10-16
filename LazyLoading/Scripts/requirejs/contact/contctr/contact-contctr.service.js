/**
Created by Brikesh Yadav on 20 Sept 2018.
*/
define(['jQuery'], function ($) {

    var contactusService = function ($http) {
       // var _apiPrefix = apiConfig.apiEndPoint;

        this.GetcontactusDescription = function (Id) {
           
            var request = $http({
                method: "get",
                url: "Systemcontactus/Systemcontactus/GetcontactusDescription?MenuId=" + Id,
                dataType: "json"
            });
            return request;
        }


    }
    contactusService.Name = 'contactusService';
    contactusService.$inject = ['$http'];
    return contactusService;
});