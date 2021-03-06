

// 类 构造函数的参数fn 方法 .then

/**
 * author: zgf
 * data:2018-6-21
 * 模块提供Promise类
 */
// 
class Promise {
    constructor(executor) {
        // promise状态
        // pending 等待
        // resolved 成功
        // rejected 失败
        this.status = 'pending'
        this.value = undefined;
        this.reason = undefined;
        let resolve = (value) => {
            if (this.status === 'pending') {
                this.status = 'resolved'
                this.value = value;

            }
        };
        let reject = (reason) => {
            if (this.status === 'pending')
                this.status == 'rejected'
            this.reason = this.reason
        }
        executor(resolve);
    }
    then(onFullfilled, onrejected) {
        if (this.status === 'resolved') {
            onFullfilled(this.value);
        }
        if (this.status == 'rejected') {
            onrejected(this.reason)
        }

    }
}





module.exports = Promise;
