import Observer from './Observer'
import Compiler from './Compiler'

class myVue {
    constructor(options) {
        // 获取对象传入的数据
        this.$options = options
        this.$el = this.$options.el
        this._data = this.$options.data

        // 将传入的所有属性添加get/set的属性监听
        // 属性值发生改变会触发set方法
        Object.keys(this._data).forEach(key=>{
            this.add_watch(key)
        })

        // 将所有属性加入订阅发布者模式的管理中
        new Observer(this._data)

        // 编译渲染页面
        new Compiler(this.$el, this)
    }
    add_watch(key) {
        var self = this
        Object.defineProperty(this, key, {
            get() {
                return self._data[key]
            },
            set(value) {
                self._data[key] = value
            }
        })
    }
}

export default myVue