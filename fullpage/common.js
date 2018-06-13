class PureFullPage {
    constructor(options) {
        
        const defaultOptions = {
            isShowNav: true,
            delay: 1000,
            // 每次turn page 之后执行的callback
            definePages: () => { }
        }
        this.options = Object.assign(defaultOptions, options);
        console.log(this.options)
        // options 插件的配置
        //constructor 属性定义
        // 1.手动计算page的高度  #pureFullPage 的高度
        this.container = document.getElementById('pureFullPage');
        
        this.viewHeight = document.documentElement.clientHeight;
        
        this.DELAY = this.options.delay || 1000;
        this.currentPosition = 0;
        // console.log(this.options.delay);
        this.init();
    }
    init() {
        this.container.style.height = `${this.viewHeight}px`;
     

        // mousewheel 截流
        // this.scrollMouse 方式  负责滚动  执行太频繁
        // throttle 在规定事件里只执行一次
        // 从新返回一个参数,handleMouseWheel   闭包 --函数定义时候的上下文环境
        // 将this.scrollMouse  封装内部
        // this,  函数执行时的作用域
        // 1000  dely  推迟执行的时间
        const handleMouseWheel = utils.throttle(this.scrollMouse,this,this.DELAY);//常量大写

        if(navigator.userAgent.toLowerCase().indexOf('firefox')=== -1) {
            document.addEventListener('mousewheel',handleMouseWheel,false)
        } else {
            document.addEventListener('DOMMousescroll',handleMouseWheel,false) 
        }
    //     事件监听   浏览器嗅探
    //    mousewheel
    //    firefox  DOMMouseScroll  要兼容所有浏览器
        // 事件的处理函数交由对象的方法来执行,
        window.addEventListener('resize',this.handleWindowResize.bind(this), false )//false 冒泡的处理方式

    //     事件监听   浏览器嗅探
    //    mousewheel
    //    firefox  DOMMouseScroll  要兼容所有浏览器

    }
    // 滚轮事件处理函数
    scrollMouse(event) {
        console.log(this.container);
        const delta = utils.getWheelDelta(event);
        console.log(delta);
        if(delta > 0) {
            //向上滚
            this.goUp();
        }else {
            //向下滚
            this.goDown()
        }
        
    }
    handleWindowResize(event) {
        // 对象的方法，肯定需要找到对象
        // console.log(this);
        //this  PullFullPage
        // 防抖
        utils.debounce(this.getNewPosition,this,event,this.DELAY)
    }

    getNewPosition() {
        console.log('debounce')
        this.viewHeight =document.documentElement.clientHeight;
        this.container.style.height = `${this.viewHeight}px`;
    }
    goUp() {console.log(this.currentPosition,this.viewHeight)
        if(this.currentPosition == 0) return;
        this.currentPosition += this.viewHeight;
        
        this.container.style.top = `${this.currentPosition}px`
    }
    goDown() {
        
        if(this.currentPosition == -2*this.viewHeight) return;
        this.currentPosition -= this.viewHeight;
        this.container.style.top = `${this.currentPosition}px`
        
    }
}