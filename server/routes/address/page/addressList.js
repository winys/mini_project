const PageCgiBase = require('../../pageCgiBase')

// 地区列表页面渲染
class AddressListPage extends PageCgiBase {
    constructor() {
        super(...arguments)
    }

    handle() {
        this.res.$render('address/addressList')
    }
}

module.exports = AddressListPage.makeRouteHandler()