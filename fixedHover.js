/**
 * 修复hover方法，在鼠标不断快速移入移出时的闪动bug
 * @param {String} [options.selector] 需要触发的元素的选择器
 * @param  {Number} [options.enterTimeout = 200] 鼠标移上去经过这一延时后再执行，默认为200
 * @param  {Number} [options.leaveTimeout = 200] 鼠标移开经过这一延时后再执行，默认为200
 * @param {Function} [options.beforeFun = function(){}] 鼠标移动上去，触发enterFun之前的回调，参数为this及setting
 * @param  {Function} [options.enterFun = function(){}] mouseenter的回调函数，参数为this及setting
 * @param  {Function} [options.leaveFun = function(){}] leaveFun的回调函数，参数为this及setting
 * @return null
 * @example
 * $.fixedHover({
      selector: '.wk_fr',
      enterTimeout: 100,
      leaveTimeout: 400,
      beforeFun: function(settings){
        var $this = $(this);
        // 加入有很多地方同时掉fixedHover方法，鼠标快速一到各个触发元素上，当一到某一触发元素上时，隐藏其他的已出发元素
        $('.wk_fr').not($this).removeClass('hover').find($('.popDown')).hide();
      },
      enterFun: function(settings){
        var $this = $(this);
        $this.find(".popDown").show("fast");
        $this.addClass("hover");
      },
      leaveFun: function(settings){
        var $this = $(this);
        $this.removeClass("hover");
        $this.find(".popDown").hide("fast");
      }
    });
 */
(function($, window){
  $.fixedHover = function(options) {
    var defaults = {
      enterTimeout: 200,
      leaveTimeout: 200,
      beforeFun: function(){},
      enterFun: function(){},
      leaveFun: function(){}
    };
    var settings = $.extend(defaults, options || {});
    var enterTimer, leaveTimer;

    if($.trim(settings.selector)){
      // 当hover中有定时器时，在某一段时间内适时清掉定时器
      $(settings.selector).live('mouseenter', function(){
        var $this = $(this);
        settings.beforeFun.apply($this, settings);
        // 清掉mouseleave时的定时器
        window.clearTimeout(leaveTimer);
        enterTimer = window.setTimeout(function() {
          // 以当前节点为this对象
          settings.enterFun.apply($this, settings)
        }, settings.enterTimeout);
      });

      $(settings.selector).live('mouseleave', function(){
        var $this = $(this);
        // 清掉mouseenter时的定时器
        window.clearTimeout(enterTimer);
        leaveTimer = window.setTimeout(function() {
          // 以当前节点为this对象
          settings.leaveFun.apply($this, settings)
        }, settings.leaveTimeout);
      });
    } else {
      try{
        console.error('请传入需触发元素的选择器')
      } catch(e){
        return false;
      }
    }
  }
})(jQuery, window);