require('../globals')

const cluster = require('cluster')
const config = require('../config')

const isMaster = cluster.isMaster

if (isMaster) {
    console.log(`init ${config.projectName}, host:${config.host}, port:${config.port}`)
}

process.on('uncaughtException', (error) => {
    let procType = (isMaster ? 'master' : 'worker')
    let msg = error.message || '-'
    let stack = error.stack || '-'

    let content = `${procType} uncaughtException: ` + JSON.stringify({ msg, stack })
    console.error(content)
})

if (config.env === 'local' || !isMaster) {
    require('./worker')(config)
} else {
    require('./master')(cluster, config)
}