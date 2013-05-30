/**
 * 修复hover方法，在鼠标不断快速移入移出时的闪动bug
 * @param  {Number} [options.enterTimeout = 200] 鼠标移上去经过这一延时后再执行，默认为200
 * @param  {Number} [options.leaveTimeout = 200] 鼠标移开经过这一延时后再执行，默认为200
 * @param  {Function} [options.enterFun = function(){}] mouseenter的回调函数
 * @param  {Function} [options.leaveFun = function(){}] leaveFun的回调函数
 * @return this
 */
(function($, window){
  $.fn.fixedHover = function(options) {
    var defaults = {
      enterTimeout: 200,
      leaveTimeout: 200,
      enterFun: function(){},
      leaveFun: function(){}
    };
    var settings = $.extend(defaults, options || {});
    var enterTimer, leaveTimer;
    $(this).each(function() {
      var $this = $(this);
      // 当hover中有定时器时，在某一段时间内适时清掉定时器
      $this.hover(function() {
        // 清掉mouseleave时的定时器
        window.clearTimeout(leaveTimer);
        enterTimer = window.setTimeout(function() {
          // 以当前节点为this对象
          settings.enterFun.apply($this)
        }, settings.enterTimeout);
      }, function() {
        // 清掉mouseenter时的定时器
        window.clearTimeout(enterTimer);
        leaveTimer = window.setTimeout(function() {
          // 以当前节点为this对象
          settings.leaveFun.apply($this)
        }, settings.leaveTimeout);
      })
    });
    return $(this);
  }
})(jQuery, window);