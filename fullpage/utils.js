
// 截流  throttle  在规定时间内只执行一次，先执行
// 防抖 debounce    在规定时间内执行一次，后执行  
// 都为解决高频事件而来 scroll mousewheel mousemover  mousemove tocuhemove onresize
const utils = {
    // 帮忙method执行的次数在规定的时间内只有一次
    // method 执行时，函数内的this指向PureFullPage 就可以获得pureFullPage的属性
    // this.container

    throttle(method, context, delay) {
        // 返回的函数就是等下事件执行的真正函数体

        let wait = false;
        // 闭包
        return function (...args) { // args? 
            // console.log(wait)
            // console.log(args)
            // 一个方法当做普通函数执行时， this指向window
            // args  event对象
            // 执行时，上下文环境要和以前一样
            if (!wait) {
                console.log(111)
                method.apply(context, args);
                wait = true;
                setTimeout(() => {
                    wait = false;
                }, delay)
            }
        }
    },

    //context 上下文环境
    debounce(method, context, event, delay) {
        // window.resize 不要急，等一下在执行
        clearTimeout(method.tId)
        //定时器怎么保持它的名字
        // js 动态语言
        method.tId = setTimeout(()=> {
            method.call(context, event);
        },delay)
    },


    getWheelDelta (event) {
        // console.log(event);
        if (event.wheelDelta) {
          this.getWheelDelta = event => event.wheelDelta;
          return event.wheelDelta;
        }
      }
    
}