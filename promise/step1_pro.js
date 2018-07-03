class Promise {
    constructor(excutor) {
        this.status = "pending";
        this.value = undefined;
        this.reason = undefined;
        this.onFullFilledCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = (value) =>{
            if (this.stats == "pending") {
                this.status = "resolved";
                this.value = value;
                this.onFullFilledCallbacks.forEach(fn => fn())
            }
        }
        let reject = (reason) => {
            if(this.status == "pending") {
                this.reason = reason;
                this.status = "rejected";
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        excutor(resolve, reject)
    }
    then(onFullFilled, onRejected) {
        if (this.status == "resolved") {
            onFullFilled(this.value)
        }
        if(this.status == "rejected") {
            onRejected(this.reason)
        }
        if( this.status == "pengding") {
            this.onFullFilledCallbacks.push(() => {
                onFullFilled(this.value)
            })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason)
            })
        }
    }
}