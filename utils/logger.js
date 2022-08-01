var path = require('path');

const log = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: "\x1b[2m",
    color: {
        error: "\x1b[31m",
        info: "\x1b[34m",
        warn: "\x1b[33m",
        debug: "\x1b[32m",
        raw: "\x1b[37m",
    }
}

class Logger {
    log(type, message, file) {
        var fn = path.basename(file)
        console.log(`${log.color[type]}[${type.toUpperCase()}:${log.reset}${log.bold}${fn}${log.reset}${log.color[type]}]${log.reset} ${log.dim}${message}${log.reset}`);
    }

    error(message, file) {
        this.log('error', message, file);
    }

    info(message, file) {
        this.log('info', message, file);
    }

    warn(message, file) {
        this.log('warn', message, file);
    }

    debug(message, file) {
        this.log('debug', message, file);
    }

    raw(message, file) {
        this.log('raw', message, file);
    }
}

module.exports = Logger;