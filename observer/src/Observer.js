import Dep from './Dep'

class Observer {
    constructor(data) {
        // 获取所有属性数据
        this.data = data

        // 为所有属性数据添加get/sete的属性监听
        Object.keys(this.data).forEach(key=>{
            this._bind(data, key, data[key])
        })
    }
    _bind(data, key, val) {
        var myDep = new Dep()
        Object.defineProperty(data, key, {
            get() {
                // 如果是为订阅的对象，则添订阅
                if(Dep.target) myDep.listen(Dep.target)
                return val
            },
            set(newValue) {
                if (newValue === val) return 
                val = newValue
                // 如果数值改变，则发布更新
                myDep.notify()    
            }
        })
    }
}

export default Observer