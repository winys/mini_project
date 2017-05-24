const os = require('os')
const dateFormat = require('../vendors/dateformat')

const WORKERS = []
const EXIT_MESSAGES = []

let exitTimer = 0

module.exports = (cluster, config) => {
    let cpuNums = os.cpus().length

    cluster.on('exit', (worker, code, signal) => {
        let shutdownMsg = `worker process has been shutdown at <${getNowTime()}>: worker_id(${worker.id}), code(${code}), signal(${signal})`

        EXIT_MESSAGES.push(shutdownMsg)
        console.error(shutdownMsg)

        let workerIndex = _.findIndex(WORKERS, ['id', worker.id])
        if (workerIndex) {
            WORKERS.splice(workerIndex, 1)
        }

        if (exitTimer === 0) {
            exitTimer = setTimeout(() => {
                    exitTimer = 0

                    // 判断进程数是否少于指定数量，若少则补充新工作进程
                    _.times(Math.max(0, cpuNums - WORKERS.length), () => {
                        let newWorker = cluster.fork()
                        WORKERS.push(newWorker)
                        bindWorkerEvent(newWorker)

                        let message = `worker process has been started at <${getNowTime()}> after shutdown: new_worker_id(${newWorker.id})`
                        EXIT_MESSAGES.push(message)
                        logger.info(message)
                    })

                    console.log('worker exit messages: ' + EXIT_MESSAGES.join(' '))
                    EXIT_MESSAGES.length = 0
                }, 300 * 1000) // 300秒警告重新补充工作进程间隔
        }
    })

    // fork workers
    _.times(cpuNums, () => {
        let worker = cluster.fork()
        WORKERS.push(worker)
        bindWorkerEvent(worker)
    })
}

function bindWorkerEvent(worker) {
    // not tested, may not work
    worker.on('error', (error) => {
        let message = 'worker error: ' + JSON.stringify({
            'msg': error.message || '-',
            'stack': error.stack || '-',
        })

        console.error(message)
    })
}

function getNowTime() {
    return dateFormat(new Date, 'yyyy-mm-dd HH:MM:ss')
}