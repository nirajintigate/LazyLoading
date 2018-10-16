/**
 * Main App Module
 */

define([
    'angular',
], function (angular) {
    'use strict';

    var app_common_components = angular.module('app.common.components', []);

    app_common_components.directive('showError', function ($timeout) {
        return {
            restrict: 'A',
            require: '^form',
            link: function (scope, el, attrs, formCtrl) {
                // find the text box element, which has the 'name' attribute
                var inputEl = el[0].querySelector("[name]");
                // convert the native text box element to an angular element
                var inputNgEl = angular.element(inputEl);
                // get the name on the text box
                var inputName = inputNgEl.attr('name');

                // only apply the has-error class after the user leaves the text box
                inputNgEl.bind('blur', function () {
                    el.toggleClass('has-error', formCtrl[inputName].$invalid);
                    el.children().toggleClass('ng-touched', formCtrl[inputName].$invalid);
                    el.children().toggleClass('input-validation-error', formCtrl[inputName].$invalid);
                });

                scope.$on('show-errors-check-validity', function () {

                    if (el.children().prop('disabled')) {
                        el.toggleClass('has-error', true);
                        el.children().toggleClass('ng-untouched', false);
                        el.children().toggleClass('ng-touched', true);
                        el.children().toggleClass('ng-valid', false);
                        el.children().toggleClass('ng-invalid', true);
                        return;
                    }
                    el.toggleClass('has-error', formCtrl[inputName].$invalid);
                    el.children().toggleClass('ng-touched', formCtrl[inputName].$invalid);
                    el.children().toggleClass('input-validation-error', formCtrl[inputName].$invalid);

                    //el.children().toggleClass('input-validation-error', formCtrl[inputName].$pristine);
                    //el.children().toggleClass('ng-invalid', formCtrl[inputName].$pristine);
                    //el.children().toggleClass('ng-invalid-required', formCtrl[inputName].$pristine);
                    //el.children().removeClass('ng-valid');
                    //el.children().removeClass('ng-valid-required');

                });

                scope.$on('show-errors-reset', function () {
                    $timeout(function () {
                        el.removeClass('has-error');
                        el.children().removeClass('ng-touched');
                        el.children().removeClass('input-validation-error');

                    }, 0, false);
                });
            }
        }
    });

    app_common_components.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';
            max = parseInt(max, 10);
            if (!max) return value;

            var checkLenghtWithouthHtml = (value != null && value != '') ? String(value).replace(/<[^>]+>/gm, '') : '';

            if (checkLenghtWithouthHtml.length <= max) return value;

            value = htmlSubstring(value, max)

            //  value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }
            return value + (tail || ' …');
        };
    });

    app_common_components.directive('fileModel', ['$parse', function ($parse) {

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

    app_common_components.directive("ngBindHtmlUnsafe", [function () { return function (n, i, t) { i.addClass("ng-binding").data("$binding", t.ngBindHtmlUnsafe), n.$watch(t.ngBindHtmlUnsafe, function (n) { i.html(n || "") }) } }])

    app_common_components.directive('buttonSpinner', function ($compile) {
        "use strict";

        return {
            restrict: 'A',
            scope: {
                spinning: '=buttonSpinner',
                spinningIcon: '@?',
                buttonPrepend: '@?',
                buttonAppend: '@?'
            },
            transclude: true,
            template:
            "<i  ng-show=\"spinning\"  class=\"ildr fa fa-spinner fa-spin\" ></i>" +
            "<ng-transclude></ng-transclude>"


            //"<span ng-if=\"!!buttonPrepend\" ng-hide=\"spinning\"><i class=\"{{ buttonPrepend }}\"></i></span>" +
            //"<span ng-if=\"!!buttonPrepend\" ng-show=\"spinning\"><i class=\"{{ !!spinningIcon ? spinningIcon : 'action-spinner fa fa-spinner fa-spin' }}\"></i></span>" +
            //"<ng-transclude></ng-transclude></span>" +
            //"<span ng-if=\"!!buttonAppend\" ng-hide=\"spinning\"><i class=\"{{ buttonAppend }}\"></i></span>" +
            //"<span ng-if=\"!buttonPrepend\" ng-show=\"spinning\"><i class=\"{{ !!spinningIcon ? spinningIcon : 'action-spinner fa fa-spinner fa-spin' }}\"></i></span>"
        }
    });

    app_common_components.directive('bufferedScroll', function ($parse) {
        return function ($scope, element, attrs) {
            var handler = $parse(attrs.bufferedScroll);
          
           // element.scroll(function (evt) {
                $(element).scroll(function (evt) {
                var scrollTop = element[0].scrollTop,
                    scrollHeight = element[0].scrollHeight,
                        offsetHeight = element[0].offsetHeight+20;

                //    console.log(scrollTop + " " + scrollHeight + " " + offsetHeight);

                if (scrollTop >= (scrollHeight - offsetHeight)) {
                    $scope.$apply(function () {
                        handler($scope);
                    });
                }
            });
        };
    });

    app_common_components.directive('jqdatepicker', function () {

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {

                var newdate = new Date();
                newdate.setDate(newdate.getDate() + 3);
                $(element).datepicker({
                //  element.datepicker({
                    changeMonth: true,
                    changeYear: true,
                    dateFormat: 'dd/mm/yy',
                    // yearRange: '1990:2050',
                    // maxDate: newdate,
                    onSelect: function (date) {
                        scope[attrs.ngModel] = date;
                        scope.$apply();
                        // $("input[name=txtDate]").removeClass("input-validation-error");
                        $("input[name=" + attrs.name + "]").removeClass("input-validation-error");
                    }
                });
            }
        };
    })

    app_common_components.directive('validPrice', function () {
        return {
            require: '?ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                if (!ngModelCtrl) {
                    return;
                }

                ngModelCtrl.$parsers.push(function (val) {
                    if (angular.isUndefined(val)) {
                        var val = '';
                    }

                    var clean = val.replace(/[^-0-9\.]/g, '');
                    var negativeCheck = clean.split('-');
                    var decimalCheck = clean.split('.');
                    if (!angular.isUndefined(negativeCheck[1])) {
                        negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                        clean = negativeCheck[0] + '-' + negativeCheck[1];
                        if (negativeCheck[0].length > 0) {
                            clean = negativeCheck[0];
                        }

                    }

                    if (!angular.isUndefined(decimalCheck[1])) {
                        decimalCheck[1] = decimalCheck[1].slice(0, 6);
                        clean = decimalCheck[0] + '.' + decimalCheck[1];
                    }

                    if (val !== clean) {
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }
                    return clean;
                });

                element.bind('keypress', function (event) {
                    if (event.keyCode === 32) {
                        event.preventDefault();
                    }
                });
            }
        };
    })

    app_common_components.directive('numbersOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (inputValue) {

                    if (inputValue == undefined) return ''
                    var transformedInput = inputValue.replace(/[^0-9]/g, '');
                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }
        };
    })

    app_common_components.directive("fileinput", [function () {
            return {
                scope: {
                    fileinput: "=",
                    filepreview: "="
                },
                link: function (scope, element, attributes) {
                    element.bind("change", function (changeEvent) {
                        scope.filepreview = [];
                        scope.fileinput = changeEvent.target.files;
                        angular.forEach(scope.fileinput, function (_value, _key) {
                            var reader = new FileReader();
                            reader.onload = function (loadEvent) {
                                scope.$apply(function () {
                                    var _objFiles = {};
                                    _objFiles.name = _value.name;
                                    _objFiles.sizeKB = _value.size / 1024;
                                    _objFiles.imgsrc = loadEvent.target.result;
                                    _objFiles.file = _value;
                                    scope.filepreview.push(_objFiles);
                                });
                            }
                            reader.readAsDataURL(scope.fileinput[_key]);
                        });
                    });
                }
            }
    }])

    app_common_components.filter('highlight', ['$sce', function ($sce) {
            return function (input, searchParam) {
                if (typeof input === 'function') return '';
                if (searchParam) {
                    var words = '(' +
                        searchParam.split(/\ /).join(' |') + '|' +
                        searchParam.split(/\ /).join('|') +
                        ')',
                        exp = new RegExp(words, 'gi');
                    if (words.length) {
                        input = input.replace(exp, "<span class=\"highlight\">$1</span>");
                    }
                }
                return $sce.trustAsHtml(input);
            };
    }])

    app_common_components.directive('printoutLink', function ($timeout) {
        var printSection = document.getElementById("printSection");
        function printElement(elem) {
            var contents = elem.innerHTML;
            var frame1 = document.createElement('iframe');
            frame1.name = "frame1";
            frame1.style.position = "absolute";
            frame1.style.top = "-1000000px";
            document.body.appendChild(frame1);
            var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
            frameDoc.document.open();
            frameDoc.document.write('<html><head><title></title>');
            frameDoc.document.write('</head><body>');
            frameDoc.document.write(contents);
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            $timeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                document.body.removeChild(frame1);
            }, 500);
        }
        function link(scope, element, attrs) {
            element.on('click', function () {
                var innerContents = $("#" + attrs.printoutLink).html();
                
                setTimeout(function () {
                    var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
                    popupWinindow.document.open();
                    popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
                    popupWinindow.document.close();
                }, 50);
            });


            ///////Same Windows////////////////
            //element.on("click", function (evt) {
            //    evt.preventDefault();
            //    var elemToPrint = document.getElementById(attrs.printoutLink);
            //    if (elemToPrint) {
            //        printElement(elemToPrint);
            //        // window.print();
            //    }
            //});

            /////////////////End Same Windows ////////////////////

            window.onafterprint = function () {
                // clean the print section before adding new content
                printSection.innerHTML = '';
            }
        }


        return {
            restrict: 'A',
            link: link//function (scope, element, attrs) {

            //} 
        };
    })

        ////////////For Multi Select Box///////
    app_common_components.filter('propsFilter', function () {
            return function (items, props) {
                var out = [];

                if (angular.isArray(items)) {
                    var keys = Object.keys(props);

                    items.forEach(function (item) {
                        var itemMatches = false;

                        for (var i = 0; i < keys.length; i++) {
                            var prop = keys[i];
                            var text = props[prop].toLowerCase();
                            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                                itemMatches = true;
                                break;
                            }
                        }

                        if (itemMatches) {
                            out.push(item);
                        }
                    });
                } else {
                    // Let the output be the input untouched
                    out = items;
                }

                return out;
            };
        });

    app_common_components.directive('autocomplete', function () {
        var index = -1;

        return {
            restrict: 'E',
            scope: {
                searchParam: '=ngModel',
                suggestions: '=data',
                onType: '=onType',
                onSelect: '=onSelect',
                autocompleteRequired: '='
            },
            controller: ['$scope', function ($scope) {
                // the index of the suggestions that's currently selected
                $scope.selectedIndex = -1;

                $scope.initLock = true;

                // set new index
                $scope.setIndex = function (i) {
                    $scope.selectedIndex = parseInt(i);
                };

                this.setIndex = function (i) {
                    $scope.setIndex(i);
                    $scope.$apply();
                };

                $scope.getIndex = function (i) {
                    return $scope.selectedIndex;
                };

                // watches if the parameter filter should be changed
                var watching = true;

                // autocompleting drop down on/off
                $scope.completing = false;

                // starts autocompleting on typing in something
                $scope.$watch('searchParam', function (newValue, oldValue) {

                    if (oldValue === newValue || (!oldValue && $scope.initLock)) {
                        return;
                    }

                    if (watching && typeof $scope.searchParam !== 'undefined' && $scope.searchParam !== null && $scope.searchParam !== '') {
                        $scope.completing = true;
                        $scope.searchFilter = $scope.searchParam;
                        $scope.selectedIndex = -1;
                    }

                    // function thats passed to on-type attribute gets executed
                    if ($scope.onType)
                        $scope.onType($scope.searchParam);
                });

                // for hovering over suggestions
                this.preSelect = function (suggestion) {

                    watching = false;

                    // this line determines if it is shown
                    // in the input field before it's selected:
                    //$scope.searchParam = suggestion;

                    $scope.$apply();
                    watching = true;

                };

                $scope.preSelect = this.preSelect;

                this.preSelectOff = function () {
                    watching = true;
                };

                $scope.preSelectOff = this.preSelectOff;

                // selecting a suggestion with RIGHT ARROW or ENTER
                $scope.select = function (suggestion) {
                    if (suggestion) {
                        $scope.searchParam = suggestion;
                        $scope.searchFilter = suggestion;
                        if ($scope.onSelect)
                            $scope.onSelect(suggestion);
                    }
                    watching = false;
                    $scope.completing = false;
                    setTimeout(function () { watching = true; }, 1000);
                    $scope.setIndex(-1);
                };


            }],
            link: function (scope, element, attrs) {

                setTimeout(function () {
                    scope.initLock = false;
                    scope.$apply();
                }, 250);

                var attr = '';

                // Default atts
                scope.attrs = {
                    "placeholder": "start typing...",
                    "class": "",
                    "id": "",
                    "tabIndex": "",
                    "inputclass": "",
                    "inputid": "",
                    "inputtabIndex": "",
                };

                for (var a in attrs) {
                    attr = a.replace('attr', '').toLowerCase();
                    // add attribute overriding defaults
                    // and preventing duplication
                    if (a.indexOf('attr') === 0) {
                        scope.attrs[attr] = attrs[a];
                    }
                }

                if (attrs.clickActivation) {
                    element[0].onclick = function (e) {
                        if (!scope.searchParam) {
                            setTimeout(function () {
                                scope.completing = true;
                                scope.$apply();
                            }, 200);
                        }
                    };
                }

                var key = { left: 37, up: 38, right: 39, down: 40, enter: 13, esc: 27, tab: 9 };

                document.addEventListener("keydown", function (e) {
                    var keycode = e.keyCode || e.which;

                    switch (keycode) {
                        case key.esc:
                            // disable suggestions on escape
                            scope.select();
                            scope.setIndex(-1);
                            scope.$apply();
                            e.preventDefault();
                    }
                }, true);

                document.addEventListener("blur", function (e) {
                    // disable suggestions on blur
                    // we do a timeout to prevent hiding it before a click event is registered
                    setTimeout(function () {
                        scope.select();
                        scope.setIndex(-1);
                        scope.$apply();
                    }, 150);
                }, true);

                element[0].addEventListener("keydown", function (e) {
                    var keycode = e.keyCode || e.which;

                    var l = angular.element(this).find('li').length;

                    // this allows submitting forms by pressing Enter in the autocompleted field
                    if (!scope.completing || l == 0) return;

                    // implementation of the up and down movement in the list of suggestions
                    switch (keycode) {
                        case key.up:

                            index = scope.getIndex() - 1;
                            if (index < -1) {
                                index = l - 1;
                            } else if (index >= l) {
                                index = -1;
                                scope.setIndex(index);
                                scope.preSelectOff();
                                break;
                            }
                            scope.setIndex(index);

                            if (index !== -1)
                                scope.preSelect(angular.element(angular.element(this).find('li')[index]).text());

                            scope.$apply();

                            break;
                        case key.down:
                            index = scope.getIndex() + 1;
                            if (index < -1) {
                                index = l - 1;
                            } else if (index >= l) {
                                index = -1;
                                scope.setIndex(index);
                                scope.preSelectOff();
                                scope.$apply();
                                break;
                            }
                            scope.setIndex(index);

                            if (index !== -1)
                                scope.preSelect(angular.element(angular.element(this).find('li')[index]).text());

                            break;
                        case key.left:
                            break;
                        case key.right:
                        case key.enter:
                        case key.tab:

                            index = scope.getIndex();
                            // scope.preSelectOff();
                            if (index !== -1) {
                                scope.select(angular.element(angular.element(this).find('li')[index]).text());
                                if (keycode == key.enter) {
                                    e.preventDefault();
                                }
                            } else {
                                if (keycode == key.enter) {
                                    scope.select();
                                }
                            }
                            scope.setIndex(-1);
                            scope.$apply();

                            break;
                        case key.esc:
                            // disable suggestions on escape
                            scope.select();
                            scope.setIndex(-1);
                            scope.$apply();
                            e.preventDefault();
                            break;
                        default:
                            return;
                    }

                });
            },
            template: '\
        <div class="autocomplete {{ attrs.class }}" id="{{ attrs.id }}">\
            <div class="autocomplete-textbox-dropdown">\
                          <input\
                            type="text"\
                            ng-model="searchParam"\
                            placeholder="{{ attrs.placeholder }}"\
                            class="{{ attrs.inputclass }} autocompleteTxtGrid autocomplete-input-text"\
                            id="{{ attrs.inputid }}"\
                            tabIndex="1"\
                            ng-required="{{ autocompleteRequired }}"  autocomplete="off"/>\
                          <span class="autocomplete-dropdown-button"><img src="/images/dropdown-arrow.png"/> </span>\
            </div>\
          <ul ng-show="completing && (suggestions | filter:searchFilter).length > 0" ng-class="ng-hide">\
            <li\
              suggestion\
              ng-repeat="suggestion in suggestions | filter:searchFilter | orderBy:\'toString()\' track by $index"\
              index="{{ $index }}"\
              val="{{ suggestion }}"\
              ng-class="{ active: ($index === selectedIndex) }"\
              ng-click="select(suggestion)"\
              ng-bind-html="suggestion | highlight:searchParam"></li>\
          </ul>\
        </div>'
        };
    });

//////////////////End Multi Select Box////////////////////////////
    return app_common_components;

});