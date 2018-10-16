/**
Created by Anil Ghildiyal on 8 June 2018.
*/
define(['jQuery'], function ($) {
    'use strict';
    
    var sidebarNavigationService = (function () {        
        var init = function () {
            nav();
            sidebarMiniAdjustment();
        },
            nav = function () {

                var hashurl = location.hash;
                $('.gw-nav > li > a').each(function () {
                    var anchorLink = $(this).attr("href");
                    if (hashurl.substring(1, hashurl.length) === anchorLink) {
                        rootclicked($(this));
                    }
                });
                $('.gw-nav > li > ul > li > a').each(function () {
                    var anchorLink = $(this).attr("href");
                    if (hashurl.substring(1, hashurl.length) === anchorLink) {
                        var rootAnchor = $(this).parent().parent().parent().find('a.transfer-class-four');
                        rootclicked(rootAnchor);
                        childclicked($(this));
                    }
                });
                $('.gw-nav > li > ul > li > ul > li > a').each(function () {
                    var anchorLink = $(this).attr("href");
                    if (hashurl.substring(1, hashurl.length) === anchorLink) {
                        var rootAnchor = $(this).parent().parent().parent().parent().parent().find('a.transfer-class-four');
                        var subrootAnchor = $(this).parent().parent().parent().find('a.transfer-class-four');
                        rootclicked(rootAnchor);
                        childclicked(subrootAnchor);
                        lastdepthchildclicked($(this));
                    }
                });
                $('.gw-nav > li > a').click(function () {
                    rootclicked($(this));
                });
                $('.gw-nav > li > ul > li > a').click(function () {
                    childclicked($(this));
                });
                $('.gw-nav > li > ul > li > ul > li > a').click(function () {

                    lastdepthchildclicked($(this));
                });
                //////////////////////////////////////////////////////////////////////////

            },
            rootclicked = function (obj) {
                //alert("root clicked");
                var gw_nav = $('.gw-nav');
                $('.gw-nav > li > ul > li').removeClass('active');

                //  gw_nav.find('li').removeClass('active');
                // $('.gw-nav > li > ul > li').removeClass('active');

                var checkElement = $(obj).parent();
                if (checkElement.find("ul").length === 0) {
                    gw_nav.find('li').removeClass('activeRootMenu');
                    checkElement.addClass('activeRootMenu');
                }


                var ulDom = checkElement.find('.gw-submenu')[0];

                if (ulDom == undefined) {
                    //   checkElement.addClass('active');
                    $('.gw-nav').find('li').find('ul:visible').slideUp();
                    gw_nav.find('li.init-arrow-up').removeClass('init-arrow-up').addClass('arrow-down');
                    gw_nav.find('li.arrow-up').removeClass('arrow-up').addClass('arrow-down');
                    return;
                }
                if (ulDom.style.display != 'block') {
                    gw_nav.find('li').find('ul:visible').slideUp();
                    gw_nav.find('li.init-arrow-up').removeClass('init-arrow-up').addClass('arrow-down');
                    gw_nav.find('li.arrow-up').removeClass('arrow-up').addClass('arrow-down');
                    checkElement.removeClass('init-arrow-down');
                    checkElement.removeClass('arrow-down');
                    if (!checkElement.hasClass("no-dropdowns")) {
                        checkElement.addClass('arrow-up');
                    }
                    checkElement.find('ul.gw-submenu').slideDown(300);
                }
                else {
                    checkElement.removeClass('init-arrow-up');
                    checkElement.removeClass('arrow-up');
                    //checkElement.removeClass('active');  
                    if (!checkElement.hasClass("no-dropdowns")) {
                        checkElement.addClass('arrow-down');
                    }
                    checkElement.find('ul').slideUp(300);
                }


                // $('.gw-submenu').find('li').find('ul:visible').slideUp();
            },
            childclicked = function (obj) {

                var gw_nav = $('.gw-grand-submenu');
                $('ul.gw-nav > li').removeClass('activeRootMenu');
                $(obj).parent().parent().parent().addClass('activeRootMenu');

                var checkElement = $(obj).parent();
                if (checkElement.find("ul").length === 0) {
                    gw_nav.find('li').removeClass('subactiveRootMenu');
                    checkElement.addClass('subactiveRootMenu');
                }

                $(".gw-grand-submenu").not(checkElement.find("ul")).slideUp(300);

                var ulDom = checkElement.find('.gw-grand-submenu')[0];
                if (ulDom == undefined) {
                    $('.middle-sub-menues').not($(obj).parent()).removeClass('subactiveRootMenu');
                    $(obj).parent().addClass('subactiveRootMenu');
                    $('.subactive').removeClass('subactive');
                    $('.gw-submenu').find('li').find('ul:visible').slideUp();
                    gw_nav.find('li.init-arrow-up').removeClass('init-arrow-up').addClass('arrow-down');
                    gw_nav.find('li.arrow-up').removeClass('arrow-up').addClass('arrow-down');
                    //$(".gw-submenu li").removeClass('subactiveRootMenu');
                    //$(obj).parent().parent().parent().addClass('subactiveRootMenu');
                    //$(obj).parent().addClass('subactive');
                    return;
                }
                if (ulDom.style.display != 'block') {
                    gw_nav.find('li').find('ul:visible').slideUp();
                    gw_nav.find('li.init-arrow-up').removeClass('init-arrow-up').addClass('arrow-down');
                    gw_nav.find('li.arrow-up').removeClass('arrow-up').addClass('arrow-down');
                    checkElement.removeClass('init-arrow-down');
                    checkElement.removeClass('arrow-down');
                    checkElement.addClass('arrow-up');
                    //   checkElement.addClass('active');
                    checkElement.find('ul').slideDown(300);
                } else {
                    checkElement.removeClass('init-arrow-up');
                    checkElement.removeClass('arrow-up');
                    //checkElement.removeClass('active');
                    checkElement.addClass('arrow-down');
                    checkElement.find('ul').slideUp(300);
                }
            },
            lastdepthchildclicked = function (obj) {
                var gw_nav = $('.gw-nav');
                gw_nav.find('li').removeClass('activeRootMenu');
                $('.middle-sub-menues').removeClass('active');

                $(".subactive").removeClass('subactive');
                $(obj).parent().parent().parent().parent().parent().addClass('activeRootMenu');
                $(".gw-submenu li").removeClass('subactiveRootMenu');
                $(obj).parent().parent().parent().addClass('subactiveRootMenu');
                $(obj).parent().parent().parent().addClass('subactiveRootMenu');
                //$('.gw-nav > li > ul > li > ul > li').removeClass('active');
                //  $(obj).parent().parent().parent().addClass('active');
                $(obj).parent().addClass('subactive');

            },
            sidebarMiniAdjustment = function () {
                //alert($(document).height());
                //alert($(".navbar-fixed-top2").height());
                //alert($("#footer").height());
                //alert(height);
                //$("#content").height($(document).height() - $(".navbar-fixed-top2").height() - 70);

                //setTimeout(function () { 
                //    $("#content").height($(document).height() - $("#content").offset().top - 0);
                //}, 500);


                $("#content").height($(document).height() - $(".sticky-top").height() -58);



                window.toggleMenuHidden = function () {
                    $('body').toggleClass('sidebar-mini');
                    $('#menu').toggleClass('hidden-xs');
                }
                window.toggleMenuHidden = function () {

                    $('body').toggleClass('sidebar-mini');
                    $('#menu').toggleClass('hidden-xs');
                }
                var IsPostBack = false;
                $('.navbar .btn-navbar').click(function (e) {

                    e.preventDefault();
                    toggleMenuHidden();
                    IsPostBack = true;
                });
                if (!IsPostBack && $(window).width() < 701) {
                    $('body').removeClass('sidebar-mini');
                    $('#menu').addClass('hidden-xs');
                }
            };
        return {
            init: init,
            sidebarMiniAdjustment: sidebarMiniAdjustment
        };
    }());

    (function () {
        sidebarNavigationService.init();
    })($);




    //$("#dvSettings .nav li a").click(function () {        
    //    $(this).parent().siblings().removeClass("active");
    //    $(this).parent().addClass("active");
    //});
    //$(".navbar-nav li a").click(function () {        
    //    $(this).parent().siblings().removeClass("active");
    //    $(this).parent().addClass("active");        
    //});
    //$(".navbar-nav li:first-child a").click(function () {
    //    $('#dvSettings .nav li').removeClass("active");
    //    $('#dvSettings .nav li:first-child').addClass("active");        
    //});
});