const PageCgiBase = require('../../pageCgiBase')

// 地区列表页面渲染
class AddressListPage extends PageCgiBase {
    handle() {
        this.res.$render('address/addrssList')
    }
}

module.exports = AddressListPage.makeRouteHandler()