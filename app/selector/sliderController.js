
/**
 * SliderCtrl.js
 */
(function ($) {
    'use strict';

    var app = angular.module('tabLabApp');
    app.$inject = ['$scope', 'sliderProperties'];
    app.service('sliderProperties', function (){
        var DEBUG = true;
        var shoeIndex;
        var tabIndex = [];
        var numOfShoes;
        var numOfTabs;

        return {
            getShoeIndex: function () {
                return shoeIndex;
            },
            setShoeIndex: function (index) {
                shoeIndex = index;
                if(DEBUG) {
                    console.log("shoe index is set:" + shoeIndex);
                }
            },
            getTabIndex: function (pos) {
                return tabIndex[pos];
            },
            setTabIndex: function (pos, index) {
                tabIndex[pos] = index;
                if(DEBUG) {
                    console.log("tab index: " + pos + " is set to: " + tabIndex[pos]);
                }
            },
            getNumOfShoes: function () {
                return numOfShoes;
            },
            setNumOfShoes: function (number) {
                numOfShoes = number;
            },
            getNumOfTabs: function () {
                return numOfTabs;
            },
            setNumOfTabs: function (number) {
                numOfTabs = number;
            }
        };
    });
    app.controller('SliderCtrl', ['$scope', 'tabLabProperties', 'sizeProperties', 'sliderProperties', 'cartProperties', function ($scope, tabLabProperties, sizeProperties, sliderProperties, cartProperties) {
        $scope.innerWidthSize = 0;
        $scope.innerWidthSizeNew = window.innerWidth;


        $scope.$on('move-slider-shoe', function(event, pos) {
            $scope.moveSlider('shoe', pos);
        });

        $scope.$on('move-slider-tab', function(event, pos) {
            $scope.moveSlider('tab', pos);
        });

        $scope.sliderSetShoe = function(i){
            $scope.$broadcast('new-shoe-index', i);
        };

        $scope.sliderSetLeftTab = function(i){
            $scope.$broadcast('new-tab-left-index', i);
        };

        $scope.sliderSetRightTab = function(i){
            $scope.$broadcast('new-tab-right-index', i);
        };

        $scope.moveSlider = function (type, pos){
            var selector = "#" + type;
            var screen = "";
            var index;
            if (!$scope.isMobile) {
                screen = "-desktop";
            }
            if(type != 'shoe') {
                if (pos == 0 || pos == 2) {
                    index = $scope.getTabIndex(0);
                    selector += "-left";
                } else {
                    index = $scope.getTabIndex(1);
                    selector += "-right";
                }
            }else{
                index = $scope.getShoeIndex();
            }

            selector = selector + "-slider" + screen;
            console.log(selector);
        };

        $scope.random = function (){
            /*
            if(tabLabProperties.isShoeSelected()){
                // save old shoe for comparison
                var oldShoe = $scope.currentShoeObj;
            }
            */
            var i = $scope.setRandomIndex('shoe', 0);
            var j = $scope.setRandomIndex('tab', 0);
            var k = $scope.setRandomIndex('tab', 1);

            // set  tabs
            $scope.setTab($scope.tabList[j], 0);
            $scope.setTab($scope.tabList[j], 2);
            $scope.setTab($scope.tabList[k], 1);
            $scope.setTab($scope.tabList[k], 3);

            $scope.$broadcast('new-shoe-index', i);
            $scope.$broadcast('new-tab-left-index-random', j);
            $scope.$broadcast('new-tab-right-index-random', k);

        }; //end random ()

        $scope.shuffle = function (){
            var numOfCombinations = 24;

            var randomNum = Math.floor(Math.random() * numOfCombinations );
            var tabs = tabLabProperties.getAllTabs();
            var newTabs = [];
            console.log("TABS:");
            console.log(tabs);
                                // represents the physical tabs
                                // [0]  [1]
                                // [2]  [3]
            var tabPos = ['rt','lt','rb','lb'];
            tabPos = _.shuffle(tabPos);
            var topOrBottom;

            console.log("tabsPos:");
            console.log(tabPos);


            for(var i = 0; i < tabs.length; i++){
                if(tabPos[i] == 'rt'){
                    newTabs[i] = tabs[0];
                    newTabs[i].pos = '0';
                    console.log("tab:" + i);
                    console.log(newTabs[i]);
                    console.log("pos:");
                    console.log(newTabs[i].pos);
                }else if(tabPos[i] == 'lt'){
                    newTabs[i] = tabs[1];
                    newTabs[i].pos = '1';
                    console.log("tab:" + i);
                    console.log(newTabs[i]);
                    console.log("pos:");
                    console.log(newTabs[i].pos);
                }else if(tabPos[i] == 'rb'){
                    newTabs[i] = tabs[2];
                    newTabs[i].pos = '2';
                    console.log("tab:" + i);
                    console.log(newTabs[i]);
                    console.log("pos:");
                    console.log(newTabs[i].pos);
                }else{
                    newTabs[i] = tabs[3];
                    newTabs[i].pos = '3';
                    console.log("tab:" + i);
                    console.log(newTabs[i]);
                    console.log("pos:");
                    console.log(newTabs[i].pos);
                } // end if-else

            } //end for

           // tabs = tabLabProperties.getAllTabs();
            console.log("TABS SHUFFLED:");
            console.log(newTabs);

            $scope.updateTabTextureShuffle(newTabs);


        }; //end shuffle ()

        $scope.previous = function (side) {
            var i;
            var selector;
            switch (side) {
                case "left":
                    selector = '#tab-left-slider-desktop';
                    $(selector).slick('slickPrev');
                    i = $(selector).slick('slickCurrentSlide');
                    $scope.$broadcast('new-tab-left-index', i);
                    break;
                case "center":
                    selector = '#shoe-slider-desktop';
                    $(selector).slick('slickPrev');
                    i = $(selector).slick('slickCurrentSlide');
                    $scope.$broadcast('new-shoe-index', i);
                    break;
                case "right":
                    selector = '#tab-right-slider-desktop';
                    $(selector).slick('slickPrev');
                    i = $(selector).slick('slickCurrentSlide');
                    $scope.$broadcast('new-tab-right-index', i);
                    break;
                case "top":
                    selector = '#shoe-slider';
                    $(selector).slick('slickPrev');
                    i = $(selector).slick('slickCurrentSlide');
                    $scope.$broadcast('new-shoe-index', i);
                    break;
                case "middle":
                    selector = '#tab-left-slider';
                    $(selector).slick('slickPrev');
                    i = $(selector).slick('slickCurrentSlide');
                    $scope.$broadcast('new-tab-left-index', i);
                    break;
                case "bottom":
                    selector = '#tab-right-slider';
                    $(selector).slick('slickPrev');
                    i = $(selector).slick('slickCurrentSlide');
                    $scope.$broadcast('new-tab-right-index', i);
                    break;
            } //end switch

        };// end previous()

        $scope.next = function (side){
            var i;
            var selector;
            switch (side) {
                case "left":
                    selector = '#tab-left-slider-desktop';
                    $(selector).slick('slickNext');
                    i = $(selector).slick('slickCurrentSlide');
                    $scope.$broadcast('new-tab-left-index', i);
                    break;
                case "center":
                    selector = '#shoe-slider-desktop';
                    $(selector).slick('slickNext');
                    i = $(selector).slick('slickCurrentSlide');
                    $scope.$broadcast('new-shoe-index', i);
                    break;
                case "right":
                    selector = '#tab-right-slider-desktop';
                    $(selector).slick('slickNext');
                    i = $(selector).slick('slickCurrentSlide');
                    $scope.$broadcast('new-tab-right-index', i);
                    break;
                case "top":
                    selector = '#shoe-slider';
                    $(selector).slick('slickNext');
                    i = $(selector).slick('slickCurrentSlide');
                    $scope.$broadcast('new-shoe-index', i);
                    break;
                case "middle":
                    selector = '#tab-left-slider';
                    $(selector).slick('slickNext');
                    i = $(selector).slick('slickCurrentSlide');
                    $scope.$broadcast('new-tab-left-index', i);
                    break;
                case "bottom":
                    selector = '#tab-right-slider';
                    $(selector).slick('slickNext');
                    i = $(selector).slick('slickCurrentSlide');
                    $scope.$broadcast('new-tab-right-index', i);
                    break;
            } //end switch
        };// end next()

        $scope.$on('new-shoe-index', function(event, index) {
            if(tabLabProperties.isShoeSelected()){
                    // save old shoe for comparison
                    var oldShoe = $scope.currentShoeObj;
                    console.log("old shoe is:");
                    console.log(oldShoe.name);
                    console.log(oldShoe);
            }
            $scope.setShoe($scope.shoeList[index]);

            var shoe = $scope.shoeList[index];
            $scope.updateShoeTexture($scope.scene, $scope.group, oldShoe, shoe);
            cartProperties.updateCart(shoe, "shoe");
        });

        $scope.$on('new-tab-right-index', function(event, index) {
            var shoe = tabLabProperties.getShoe();
            $scope.setTab($scope.tabList[index], 0);
            $scope.setTab($scope.tabList[index], 2);
            $scope.updateTabTexture($scope.scene, 0, 'top');
            if(shoe.numOfTabs != 2) {
                $scope.updateTabTexture($scope.scene, 2, 'bottom');
            }
            var tabRight = tabLabProperties.getTab(0);
            cartProperties.updateCart(tabRight, "tabRight");
            console.log("current right tab:");
            console.log($scope.tabList[index]);
        });

        $scope.$on('new-tab-left-index', function(event, index) {
            var shoe = tabLabProperties.getShoe();
            $scope.setTab($scope.tabList[index], 1);
            $scope.setTab($scope.tabList[index], 3);
            $scope.updateTabTexture($scope.scene, 1, 'top');
            if(shoe.numOfTabs != 2) {
                $scope.updateTabTexture($scope.scene, 3, 'bottom');
            }
            var tabLeft = tabLabProperties.getTab(1);
            cartProperties.updateCart(tabLeft, "tabLeft");
            console.log("current left tab:");
            console.log($scope.tabList[index]);
        });

        $scope.$on('new-tab-right-index-random', function(event, index) {
            var shoe = tabLabProperties.getShoe();
            var tabRight = tabLabProperties.getTab(0);
            cartProperties.updateCart(tabRight, "tabRight");
        });

        $scope.$on('new-tab-left-index-random', function(event, index) {
            var shoe = tabLabProperties.getShoe();
            var tabLeft = tabLabProperties.getTab(1);
            cartProperties.updateCart(tabLeft, "tabLeft");
        });

    }]);
}(jQuery));