
// 继承  promise throttle
class Promise{
    constructor (executor) {//new Promise((resolve, reject) => {})传递的参数是个函数  resolve reject
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onResolveCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = (value) => {//value executor调用时传过来的结果
        if (this.status == 'pending') {
            this.status = 'resolved';
            this.value = value;
            this.onResolveCallbacks.forEach(fn => fn());
        }
    };
    let reject = (reason) =>{
        if (this.status == 'pending') {
            this.status = 'rejected';
            this.reason = reason;
            this.onRejectedCallbacks.forEach(fn => fn())
        }
    };
    executor(resolve, reject);
    // 执行这个函数的可以是 ajax setTimeout node 数据库处理 fs file
    }
    then (onFullFilled, onRejected) {//onFullFilled成功之后的回调函数, 失败之后的回调函数
        if (this.status == 'resolved') {
            onFullFilled(this.value);
        }
        if (this.status == 'rejected') {
            onRejected(this.reason);
        }
        if (this.status == 'pending') {
            this.onResolveCallbacks.push(() => {
                onFullFilled(this.value)
            })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason);
            })
        }
    }
}


// Forexample
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello world')
    }, 1000);
    // resolve('hello world');
    // reject('错误')
})//(resolve, reject) => { resolve('hello world')} 相当于executor 一个函数

p.then((data) => {//data相当于value
    console.log(data);
}, (err) => {
    console.log(err)
})

module.exports = Promise //common.js模块化方案 原生js支持的