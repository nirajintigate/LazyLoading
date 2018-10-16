/**
Created by Anil Ghildiyal on 8 June 2018.
*/
define(['jQuery'], function ($) {
    'use strict';

    var lazyLoad = (function () {
        var loadScript = function (path) {
            var result = $.Deferred(),
                script = document.createElement("script");
            script.async = "async";
            script.type = "text/javascript";
            script.src = path;
            script.onload = script.onreadystatechange = function (_, isAbort) {
                if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                    if (isAbort)
                        result.reject();
                    else
                        result.resolve();
                }
            };
            script.onerror = function () { result.reject(); };
            document.querySelector("head").appendChild(script);
            return result.promise();
        },
            loader = function (arrayName) {
                return {
                    load: function ($q) {
                        var deferred = $q.defer(),
                            map = arrayName.map(function (_lazyLoadObj) {  
                                return loadScript(_lazyLoadObj.filepath + _lazyLoadObj.filename + ".js");
                            });
                        $q.all(map).then(function (r) {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                };
            };

        return {
            loadScript: loadScript,
            loader: loader
        };

    }());

    return lazyLoad;

});