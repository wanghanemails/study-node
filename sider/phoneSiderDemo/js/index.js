/*!
 * PageSwitch 1.0
 *
 */

(function($){
    "use strict";
    /*
     *
     *
     *   jquery 框架开发分为两种一种直接在jquery源码下的如
     *
     *   静态方法 蕾丝$.Ajax $.extends
     *   jQuery.myPlugin = function(){
     *   }
     *
     *
     *   同态方法
     *   $.fn.myPlugin = function (){
     *
     *   }
     *   $.fn = $.prototype
     *   通过选择器得到的jquery对象实例也能共享该方法 而不是直接用$调用
     *   挂在原型下  可共享给所有对象 类似 addClass()  attr()
     *
     *
     *
     *
     * */
//闭包匿名函数 避免组建污染和全局变量污染
    /*说明:获取浏览器前缀*/
    /*实现：判断某个元素的css样式中是否存在transition属性*/
    /*参数：dom元素*/
    /*返回值：boolean，有则返回浏览器样式前缀，否则返回false*/
    var _prefix = (function(temp){
        var aPrefix = ["webkit", "Moz", "o", "ms"],
            props = "";
        for(var i in aPrefix){
            props = aPrefix[i] + "Transition";
            if(temp.style[ props ] !== undefined){
                return "-"+aPrefix[i].toLowerCase()+"-";
            }
        }
        return false;
    })(document.createElement(PageSwitch));

    var PageSwitch = (function(){
        function PageSwitch(element, options){
            this.mysettings = $.extend(true, $.fn.PageSwitch.defaults, options||{});
            this.element = element;
            this.init();
        }

        PageSwitch.prototype = {
            /*说明：初始化插件*/
            /*实现：初始化dom结构，布局，分页及绑定事件*/
            init : function(){
                var me = this;
                me.selectors = me.mysettings.selectors;
                me.sections = me.element.find(me.selectors.sections);
                me.section = me.sections.find(me.selectors.section);

                me.direction = me.mysettings.direction == "vertical" ? true : false;
                me.pagesCount = me.pagesCount();
                me.index = (me.mysettings.index >= 0 && me.mysettings.index < me.pagesCount) ? me.mysettings.index : 0;

                me.canscroll = true;

                if(!me.direction || me.index){
                    me._initLayout();
                }

                if(me.mysettings.pagination){
                    me._initPaging();
                }

                me._initEvent();
            },
            /*说明：获取滑动页面数量*/
            pagesCount : function(){
                return this.section.length;
            },
            /*说明：获取滑动的宽度（横屏滑动）或高度（竖屏滑动）*/
            switchLength : function(){
                return this.direction == 1 ? this.element.height() : this.element.width();
            },
            /*说明：向前滑动即上一页*/
            prve : function(){
                var me = this;
                if(me.index > 0){
                    me.index --;
                }else if(me.mysettings.loop){
                    me.index = me.pagesCount - 1;
                }

                if(me.index==0){
                  //  debugger
                }
                me._scrollPage();
            },
            /*说明：向后滑动即下一页*/
            next : function(){
                var me = this;
                if(me.index < me.pagesCount-1){
                    me.index ++;

                }else if(me.mysettings.loop){
                    me.index = 0;
                }

                me._scrollPage();
            },
            /*说明：主要针对横屏情况进行页面布局*/
            _initLayout : function(){
                var me = this;
                if(!me.direction){
                    var width = (me.pagesCount * 100) + "%",
                        cellWidth = (100 / me.pagesCount).toFixed(2) + "%";
                    me.sections.width(width);
                    me.section.width(cellWidth).css("float", "left");
                }
                if(me.index){
                    me._scrollPage(true);
                }
            },
            /*说明：主要针对横屏情况进行页面布局*/
            _initPaging : function(){
                var me = this,
                    pagesClass = me.selectors.page.substring(1);
                me.activeClass = me.selectors.active.substring(1);

                var pageHtml = "<ul class="+pagesClass+">";
                for(var i = 0 ; i < me.pagesCount; i++){
                    pageHtml += "<li></li>";
                }
                me.element.append(pageHtml);
                var pages = me.element.find(me.selectors.page);
                me.pageItem = pages.find("li");
                me.pageItem.eq(me.index).addClass(me.activeClass);

                if(me.direction){
                    pages.addClass("vertical");
                }else{
                    pages.addClass("horizontal");
                }
            },
            /*说明：初始化插件事件*/
            _initEvent : function(){
                var me = this;
                var startX,startY,endX,endY;
                /*绑定鼠标滚轮事件*/
                me.element.on("mousewheel DOMMouseScroll", function(e){
                    e.preventDefault();
                    var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
                    if(me.canscroll){
                        if(delta > 0 && (me.index && !me.mysettings.loop || me.mysettings.loop)){
                            me.prve();
                        }else if(delta < 0 && (me.index < (me.pagesCount-1) && !me.mysettings.loop || me.mysettings.loop)){
                            me.next();
                        }
                    }
                });

                me.element.bind("touchstart",touchstartFuc);
                me.element.bind("touchmove",touchmoveFuc);

                function touchstartFuc(event){

                    var e = event || window.event;
                    e.preventDefault();
                    var touch = e.originalEvent.targetTouches[0];
                    startX = touch.clientX
                    startY = touch.clientY
                }
                function touchmoveFuc(event){

                    var e = event || window.event;
                    e.preventDefault();
                    var touch =e.originalEvent.targetTouches[0];
                    endX = touch.clientX;
                    endY = touch.clientY;
                    if(me.direction){
                        var end = endY-startY;
                        if(end>0){
                            if(me.canscroll){
                            me.prve();
                            }
                        }else {
                            if(me.canscroll) {
                                me.next();
                            }
                        }
                    }else {
                        var end = endX-startX;
                        if(end>0){
                            me.prve();
                        }else {
                            me.next();
                        }

                    }

                }

                /*绑定分页click事件*/
                me.element.on("click", me.selectors.page + " li", function(){
                    me.index = $(this).index();
                    me._scrollPage();
                });

                if(me.mysettings.keyboard){
                    $(window).keydown(function(e){
                        var keyCode = e.keyCode;
                        if(keyCode == 37 || keyCode == 38){
                            me.prve();
                        }else if(keyCode == 39 || keyCode == 40){
                            me.next();
                        }
                    });
                }

                /*绑定窗口改变事件*/
                /*为了不频繁调用resize的回调方法，做了延迟*/
                var resizeId;
                $(window).resize(function(){
                    clearTimeout(resizeId);
                    resizeId = setTimeout(function(){
                        var currentLength = me.switchLength();
                        var offset = me.mysettings.direction ? me.section.eq(me.index).offset().top : me.section.eq(me.index).offset().left;
                        if(Math.abs(offset) > currentLength/2 && me.index < (me.pagesCount - 1)){
                            me.index ++;
                        }
                        if(me.index){
                            me._scrollPage();
                        }
                    },500);
                });

                /*支持CSS3动画的浏览器，绑定transitionend事件(即在动画结束后调用起回调函数)*/
                if(_prefix){
                    me.sections.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend", function(){
                        me.canscroll = true;
                        if(me.mysettings.callback && $.type(me.mysettings.callback) === "function"){
                            me.mysettings.callback();
                        }
                    })
                }
            },
            /*滑动动画*/
            _scrollPage : function(init){

                var me = this;
                if(me.index==3){
                //    debugger;
                }
                var dest = me.section.eq(me.index).position();
                if(!dest) return;

                me.canscroll = false;
                if(false){
                    var translate = me.direction ? "translateY(-"+dest.top+"px)" : "translateX(-"+dest.left+"px)";
                    me.sections.css(_prefix+"transition", "all " + me.mysettings.duration + "ms " + me.mysettings.easing);
                    me.sections.css(_prefix+"transform" , translate);
                    //transition 时有bug
                }else{
                    var animateCss = me.direction ? {top : -dest.top} : {left : -dest.left};
                    me.sections.animate(animateCss, me.mysettings.duration, function(){
                        me.canscroll = true;
                        if(me.mysettings.callback){
                            me.mysettings.callback();
                        }
                    });
                }
                if(me.mysettings.pagination && !init){
                    me.pageItem.eq(me.index).addClass(me.activeClass).siblings("li").removeClass(me.activeClass);
                }
            }
        };
        return PageSwitch;
    })();

    $.fn.PageSwitch = function(options){
        return this.each(function(){
            var me = $(this),
                instance = me.data("PageSwitch");

            if(!instance){
                me.data("PageSwitch", (instance = new PageSwitch(me, options)));
            }

            if($.type(options) === "string") return instance[options]();
        });
    };

    $.fn.PageSwitch.defaults = {
        selectors : {
            sections : ".sections",
            section : ".section",
            page : ".pages",
            active : ".moved",
        },
        index : 0,		//页面开始的索引
        easing : "ease",		//动画效果
        duration : 500,		//动画执行时间
        loop : false,		//是否循环切换
        pagination : true,		//是否进行分页
        keyboard : true,		//是否触发键盘事件
        direction : "vertical",		//滑动方向vertical,horizontal
        callback : ""		//回调函数
    };

    $(function(){
        $('[data-PageSwitch]').PageSwitch();
    });
})(jQuery);