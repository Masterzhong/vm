//监听者
/** 
 * vm:一个Vue的实例对象；
   exp:是node节点的v-model或v-on：click等指令的属性值。如v-model="name"，exp就是name;
   cb:是Watcher绑定的更新函数;
 * **/
class Watcher{
    constructor(vm,exp,cb){
        console.log(exp)
        this.vm = vm
        this.exp = exp
        this.cb = cb
        this.value = this.get()
    }

    update(){
       let value = this.vm.data[this.exp];
       let oldVal = this.value
       if(value !== oldVal){
           //如果原数据和更新数据不相同 则更新
           this.value = value
           //更新值
           this.cb.call(this.vm,value)
       }
    }

    get(){
        Dep.target = this;//缓存自己
        let value = this.vm.data[this.exp] //强制执行监听器里面的GET函数
        Dep.target = null //释放自己
        return value 
    }

}