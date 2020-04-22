//把对象变为可观测对象
function defineReactive(obj, key, val) {
    let dep = new Dep
    Object.defineProperty(obj, key, {
        get: function () {
            //console.log(Dep.target)
            dep.depend();
            console.log(`${key}属性被读取了`)
            return val
        },
        set: function (newVal) {
            val = newVal
            console.log(`${key}属性被修改了`)
            dep.notify()
        }
    })
}

//把对象的每一项都转化为可观测对象
function observable(obj) {
    if (!obj || typeof obj !== 'object') {
        return false
    }
    let keys = Object.keys(obj) //返回对象中的属性名数组集合
    console.log(keys)
    keys.forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}

//订阅类
class Dep {
    constructor() {
        this.subs = []
    }
    //添加订阅者
    addSub(sub) {
        this.subs.push(sub)
    }
    //判断看是否添加订阅者
    depend() {
        if (Dep.target) {
            this.addSub(Dep.target)
        }
    }
    //通知订阅更新
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }

}

Dep.target = null