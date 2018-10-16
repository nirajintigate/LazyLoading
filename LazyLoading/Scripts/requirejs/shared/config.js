/**
 * Configurations for application.
 */

define(['jQuery'],
    function ($) {    
    return {
        apiEndPoint: $("#id-admin-url").val(),/*'http://localhost:25331/',*/
        currentPage: 1,
        rowsPerPage: 20,
        imageUploadPath: $("#id-admin-url").val()+'Content/data/importedImages/uploadimage/'
    }
});