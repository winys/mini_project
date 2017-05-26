const PageCgiBase = require('../../pageCgiBase')

// 地区详情页面渲染
class AddressItemPage extends PageCgiBase {
    constructor() {
        super(...arguments)
    }

    handle() {
        this.res.$render('address/addressItem')
    }
}

module.exports = AddressItemPage.makeRouteHandler()