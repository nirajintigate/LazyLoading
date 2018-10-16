/**
Created by Brikesh Yadav on 20 Sept 2018.
*/
define(['jQuery'], function ($) {

    var aboutusService = function ($http) {
       // var _apiPrefix = apiConfig.apiEndPoint;

        this.GetaboutusDescription = function (Id) {
           
            var request = $http({
                method: "get",
                url: "Systemaboutus/Systemaboutus/GetaboutusDescription?MenuId=" + Id,
                dataType: "json"
            });
            return request;
        }


    }
    aboutusService.Name = 'aboutusService';
    aboutusService.$inject = ['$http'];
    return aboutusService;
});