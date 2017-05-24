module.exports = (req, res, next) => {
    let requestInfo = JSON.stringify({
        'url': req.originalUrl,
        'method': req.method.toUpperCase(),
        'content-type': req.get('Content-Type'),
        'body': method === 'POST' ? req.body : void(0),
        'cookies': req.cookies,
        'referer': req.headers.referer,
    })

    console.log('request =>', requestInfo)
    next()
}