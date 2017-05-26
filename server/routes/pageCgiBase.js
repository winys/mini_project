// 公共基类，用于添加公用方法，不能直接实例化

class PageCgiBase {
    constructor(req, res) {
        if (new.target === PageCgiBase) {
            throw new Error('PageCgiBase cannot be instantiated directly.')
        }
        Object.assign(this, { req, res })
    }

    static makeRouteHandler() {
        return (req, res) => new this(req, res).handle()
    }

    // 子类实现该方法处理请求
    handle() {
        throw new Error(`Please implement instance method \`${this.constructor.name}::handle\`.`)
    }
}

module.exports = PageCgiBase