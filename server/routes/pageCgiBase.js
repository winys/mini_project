class PageCgiBase {
    constructor(req, res, next) {
        if (new.target === PageCgiBase) {
            throw new Error('PageCgiBase cannot be instantiated directly.');
        }

        Object.assign(this, { req, res, next })
    }

    static makeRouteHandler() {
        return (req, res, next) => new this(req, res, next).handle()
    }

    // 子类实现该方法处理请求
    handle() {
        throw new Error(`Please implement instance method \`${this.constructor.name}::handle\`.`);
    }
}

module.exports = PageCgiBase