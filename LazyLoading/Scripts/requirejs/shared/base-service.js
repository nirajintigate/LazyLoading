/**
 * Base service class to provide common implementation for all basic 
 * api methods.
 */

define([
    'lodash',
    './config'
], function (_, oConfig) {
    'use strict';

    function BaseService(entity, apiModels) {
        var $http = BaseService.$http;  // $http static property is set by baseServiceFactory
        var Exception = BaseService.Exception; // Exception static property is set by baseServiceFactory

        /**
         * API end point for the entity.
         */
        this.url = oConfig.apiEndPoint + entity;

        /**
         * Returns list of entity.
         */
        this.get = function () {
            return $http
                .get(this.url)
                .then(extractData)
                .catch(Exception.catcher('GET list request failed for ' + entity));
        };

        /**
         * Returns single entity as per the id passed.
         */
        this.getById = function (entityId) {
            return $http
                .get(this.url + '/' + entityId)
                .then(extractData)
                .catch(Exception.catcher('GET request for ' + entity + ' with id ' + entityId + ' failed.'));
        };

        /**
         * Creates new entity based on the data passed.
         */
        this.insert = function (oEntity) {
            return $http
                .post(this.url, oEntity)
                .then(extractData)
                .catch(Exception.catcher('POST request failed for ' + entity));
        };

        /**
         * Updates existing entity based on the data passed.
         */
        this.update = function (oEntity) {
            return $http
                .put(this.url + '/' + oEntity.id, oEntity)
                .then(extractData)
                .catch(Exception.catcher('PUT request for ' + entity + ' with id ' + oEntity.id + ' failed.'));

        };

        /**
         * Saves (insert/update) entity based on whether it is already created or not.
         */
        this.save = function (oEntity) {
            return oEntity && oEntity.id ? this.update(oEntity) : this.insert(oEntity);
        };

        /**
         * Removes entity
         */
        this.delete = function (oEntity) {
            return $http
                .delete(this.url + '/' + oEntity.id)
                .catch(Exception.catcher('DELETE request for ' + entity + ' with id ' + oEntity.id + ' failed.'));

        };

        /**
         * Converts data coming from backend to get api model format for 
         * data consistency across the screens.
         */
        function transformEntity(oRemoteData) {
            var oAPIGetModel = new apiModels.Get();
            _.merge(oAPIGetModel, oRemoteData);
            return oAPIGetModel.toLocal();
        }

        /**
         * Extracts data from response of ajax request.
         */
        function extractData(response) {
            var data = response.data.data;
            if (_.isArray(data)) {
                data = _.map(data, function (oItem) {
                    return transformEntity(oItem);
                });
            } else {
                data = transformEntity(data);
            }
            return data;
        }
    }

    return BaseService;
});