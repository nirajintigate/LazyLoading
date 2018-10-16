/**
Created by Anil Ghildiyal on 8 June 2018.
*/
define(['jQuery'], function ($) {
    'use strict';    

    var alertService = (function () {

        var settings = {
            alertContainer: $(".alerts"),
            template: "<div class='alert ${alertClass}' id='id-alert' data-fadeout-after='${fadeoutAfter}'><div class='alert-close'><a class='close'data-dismiss='alert' aria-label='close' OnClick='CloseAlert()' href='#'>×</a></div><div class='alert-text'><span>${Message}</span></div></div>"
        },

            init = function () {
                bindUI();
            },

            bindUI = function () {
                $(document).on('click', '.alert .close', function () {
                    $(this.parentNode.parentNode).fadeTo(3000, 0).slideUp(3000, function () {
                        $(this).remove();
                    });
                    return false;
                });

                $('.alerts .alert').each(function () {
                    var alert = $(this);

                    if (alert.data('fadeout-after') != null && alert.data('fadeout-after') != 0) {
                        setTimeout(function () {
                            alert.fadeTo(3000, 0).slideUp(3000, function () {
                                $(this).remove();
                            });

                 


                        }, alert.data('fadeout-after'));
                    }
                });
            },
            showAlert = function (alert) {
                var temptemplate = settings.template;
                temptemplate = temptemplate.replace('${alertClass}', alert.alertClass);
                temptemplate = temptemplate.replace('${Message}', alert.message);
                temptemplate = temptemplate.replace('${fadeoutAfter}', alert.fadeoutAfter);

                settings.alertContainer.html(temptemplate);
                $(settings.alertContainer).show();
                bindUI();
            },
            success = function (message) {
                showAlert({ alertClass: "alert-success", message: message, fadeoutAfter: "5000" });
            },
            info = function (message) {
                showAlert({ alertClass: "alert-info", message: message, fadeoutAfter: "5000" });
            },
            warning = function (message) {
                showAlert({ alertClass: "alert-warning", message: message, fadeoutAfter: "5000" });
            },
            error = function (message) {
                showAlert({ alertClass: "alert-danger", message: message, fadeoutAfter: "5000" });
            };

        return {
            success: success,
            init: init,
            info: info,
            warning: warning,
            error: error
        };
    }());

    (function () {
        alertService.init();        
    })($);

    return alertService;

});

function CloseAlert() {
 
    
    $('#id-alert').fadeTo(3000, 0).slideUp(3000, function () {
        $('#id-alert').remove();
    });

}