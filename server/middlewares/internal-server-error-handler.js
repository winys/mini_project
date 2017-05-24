const config = require('../config')

module.exports = (err, req, res, next) => {
    const errorDetail = { 'msg': err.message, 'stack': err.stack }
    const content = 'INTERNAL_SERVER_ERROR => ' + JSON.stringify(errorDetail)

    console.error(content)

    const errmsg = config.env === 'production' ? err.message : errorDetail

    res.status(500).send(errmsg)
}