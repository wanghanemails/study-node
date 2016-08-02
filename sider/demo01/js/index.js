/**
 * Created by wanghan on 16/8/2.
 */


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
(function($){

    var privateFun = function(){
       // 私有方法
    }

    console.log(1)

    var PageSwitch = (function(){

        function PageSwitch(element,options){
            this.mysettings = $.extend(true, $.fn.PageSwitch.defaults,options||{});  //深拷贝  整个对象copy
            this.element = element;
            this.init();
        }
        PageSwitch.prototype = {
            init:function(){  //公共方法   初始化插件  初始化dom结构 布局 分页 和绑定事件
                var me = this;
                    me.selectors = me.mysettings.selectors;
                    me.sections = me.selectors.sections;
                    me.section = me.selectors.section;

                    me.direction = me.mysettings.direction == "vertical" ? true :false;

                    me.pagesCount = me.pagesCount();

                    me.index = (me.mysettings.index>=0&&me.mysettings.index<me.pagesCount)?me.mysettings.index:0;


                if(!me.direction){
                    me._initLayout();
                }

                if(me.mysettings.pagination){
                    me._initPaging();
                }
            },
            pagesCount:function(){       //要滑动页面数量

                return this.section.length;
            },
            prev:function(){

            },
            next:function(){

            },
            switchLength:function(){

                return this.direction ? this.element.height():this.element.width();
                                            //获取滑动的宽度(横屏滑动) 或高度(竖屏滑动)

            },//一般有下划线的未私有方法
            _initLayout:function(){
                var me = this;
                var width = (me.pagesCount()*100)+"%",cellWidth = (100/me.pagesCount().toFixed(2)+"%");
                me.sections.width(width);
                me.section.width(cellWidth).css("float","left");
                                            //针对横屏页面布局
            },
            _initPaging:function(){
                                            //实现分页的dom结构和css样式

                var me = this;
                var pagesClass = me.selectors.pages.substring(1);
                var activeClass = me.selectors.active.substring(1);
                var pageHtml = "<ul class='"+pagesClass+"'>";

                for(var i = 0 ;i<me.pagesCount();i++){
                    pageHtml += "<li></li>"
                }
                me.element.append(pageHtml);
                var pages = me.element.find(me.selectors.pages);
                me.pageItem = pages.find("li");
                me.pageItem.eq(me.index).addClass(activeClass);

                if(me.direction){

                    pages.addClass("vertical");
                }else{
                    pages.addClass("horizontal");
                }
            },
            _initEvent:function(){
               //初始化插件事件
                var me = this;
                me.element.on("click",me.selectors.pages+" li",function(){
                   me.index = $(this).index();
                    me._scrollPage();
                });
                me.element.on("mousewheel DOMMouseScroll",function(e){
                    var delta = e.originalEvent.wheelDelta|| -e.originalEvent.detail;

                    //可以循环(具体特殊判断在prev和next里 ,或者不许循环但是不在首尾)
                    if(delta>0&&(me.index&&!me.mysettings.loop||me.mysettings.loop)){

                        me.prev();
                    }else  if(delta <0&&(me.index<(me.pagesCount -1)&&!me.mysettings.loop||me.mysettings.loop)){
                        me.next();
                    }



                })

            },
        _scrollPage:function(){

        }

        }
        return PageSwitch;
    })()

    $.fn.PageSwitch = function(options){
        return this.each(function(){   //.class 所有同名
            var me = $(this);
            var instance = me.data("PageSwitch");
            if(!instance){
                instance = new PageSwitch(me,options)
                me.data("PageSwitch",instance );//单例模式
            }
             if($.type(options)==="string"){
                 return instance[options]()
             }

        })
    }
    //配置参数
    $.fn.PageSwitch.defaults = {
        selectors:{
            sections:".sections",
            section:".section",
            pages:".pages",
            active:".active"
        },
        index:0,   //索引
        easing:"ease",
        duration: "500",
        loop:"false",
        pagination:true,//是否分页
        keyboard:true,
        direction:"vertical",
        callback:""
    }
    $(function(){
        $("[data-PageSwitch]").PageSwitch();
    })
})(jQuery)