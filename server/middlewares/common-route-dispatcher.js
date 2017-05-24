const express = require('express')
const path = require('path')
const routes = require('../routes')

const routeDispatcher = express.Router()

_.each(routes, (route, routePath) => {
    const router = express.Router()

    require(path.join(SERVER_ROOT, 'routes', route))(router)

    routeDispatcher.use(routePath, router)

})

module.exports = routeDispatcher