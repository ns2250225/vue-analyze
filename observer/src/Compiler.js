import Watcher from './Watcher'

const REG = /\{\{(.*)\}\}/

class Compiler {
    constructor(el, vm) {
        this.el = document.querySelector(el)
        this.vm = vm

        // 创建文档片段，编译完成后，挂载到el元素上
        this.frag = this._createFragment()
        this.el.appendChild(this.frag)
    }
    _createFragment() {
        var frag = document.createDocumentFragment()
        var child
        while (child = this.el.firstChild) {
            this._compile(child)
            frag.appendChild(child)
        }
        return frag
    }
    _compile(node) {
        // 如果传入的是节点node
        if(node.nodeType === 1) {
            var attr = node.attributes
            var self = this
            if(attr.hasOwnProperty('v-model')){
                var name = attr['v-model'].nodeValue
                node.addEventListener('input', function(e) {
                    self.vm[name] = e.target.value
                })
                node.value = this.vm[name]
            }
        }

        // 如果传入的是元素elemet
        if (node.nodeType === 3) {
            if(REG.test(node.nodeValue)) {
                var name = RegExp.$1
                name = name.trim()
                new Watcher(node, name, this.vm)
            }
        }
    }
}

export default Compiler