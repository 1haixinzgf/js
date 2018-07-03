const Promise = require('./promise.js');

// 将要执行的耗时任务 封在executor,实例化时就开始执行.
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello')
    }, 1000)
});

p.then((data) => {
    console.log(data)
},
    (err) => {
        console.log(err)
    });
// 2s 后reslove 的定时器 同步化

// const mypromise = new Promise((resolve, reject)=>{

// })

// mypromise.then((data)=>{

// })




// setTimeout(function () {
//     console.log('yes')
// }, 2000)
// console.log('11111111')
