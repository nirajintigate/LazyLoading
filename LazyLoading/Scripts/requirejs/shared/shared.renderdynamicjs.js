/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @Anil Ghildiyal
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

// the semi-colon before the function invocation is a safety 
// net against concatenated scripts and/or other plugins     
// that are not closed properly.
/**
Created by Anil Ghildiyal on 20 June 2018.
*/
define(['jQuery', '//cdnjs.cloudflare.com/ajax/libs/tinymce/4.7.13/jquery.tinymce.min.js'], function ($) {
    'use strict';
      
    var createjscssfile = function (filename, filetype) {
        if (filetype == "js") { //if filename is a external JavaScript file
            var fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", filename);
            /* remove files, if it is already exists.*/
            removejscssfile(filename, filetype);
            document.head.appendChild(fileref);
        }
        else if (filetype == "css") {
            //if filename is an external CSS file
            var fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
            /* remove files, if it is already exists.*/
            removejscssfile(filename, filetype);
            document.head.appendChild(fileref);
        }
        return true;
    },
        removejscssfile = function (filename, filetype) {
            var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none" //determine element type to create nodelist from
            var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none" //determine corresponding attribute to test for
            var allsuspects = document.getElementsByTagName(targetelement)
            for (var i = allsuspects.length; i >= 0; i--) { //search backwards within nodelist for matching elements to remove
                if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
                    allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
            }
        };

    var callbacks = $.Callbacks(),
        addCallback = callbacks.add,
        removeCallback = callbacks.remove,
        fireCallback = callbacks.fire; 


    $.fn.ljs = function (jqtype, editorarray) {
        /* function has used to register css/js arrrays*/
        switch (jqtype) {
            case '_regeditor':
                {
                   // /* remove already registered skin css
                   // ..*/                     
                   //// removejscssfile("/Content/js/assets/lib/tinymce/skins/lightgray/skin.min.css", "css");
                    
                   // /* register tinymce editor
                   // ..*/
                   // addCallback(createjscssfile);
                    
                   // /* fire function by sending parameter
                   // ..*/
                   // fireCallback("/Content/js/assets/lib/tinymce/tinymce.min.js?release=v1.1.0.1", "js");
                    
                   // /* remove call back method
                   // ..*/
                   // removeCallback(createjscssfile);
                    
                    /* initialize editor on textarea
                    ..*/
                    $.each(editorarray, function (index, value) {
                        addCallback(seteditor);
                        fireCallback(value);
                        removeCallback(seteditor);
                    });

                    break;
                }

           
            default:
                console.log('--');
        }

        return this;
    };
      
    var seteditor = function (key) {
        setTimeout(function () {

          //  alert("setting ediotr");

            $("textarea#" + key).tinymce({
                script_url: '//cdnjs.cloudflare.com/ajax/libs/tinymce/4.7.13/jquery.tinymce.min.js',
                theme: 'advanced',
                theme_advanced_buttons1: 'fontselect,fontsizeselect,forecolor,bold,italic,underline,strikethrough,justifyleft,justifycenter,justifyright,justifyfull,removeformat,indent,outdent,numlist,bullist,copy,paste,link',
                theme_advanced_buttons2: '',
                theme_advanced_buttons3: '',
                theme_advanced_toolbar_location: 'top',
                theme_advanced_toolbar_align: 'left'
            });

            //tinymce.init({
            //    encoding: encoding,
            //    selector: "textarea#" + key,
            //    menubar: false,
            //    plugins: Plugin,
            //    toolbar: toolbar
            //});
        }, 5000);
    } 

});
 