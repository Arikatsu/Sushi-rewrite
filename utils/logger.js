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
    date() {
        return new Date().toLocaleString();
    }

    log(type, message) {
        console.log(`${log.bold}[${this.date()}] => ${log.reset}${log.color[type]}[${type.toUpperCase()}]${log.reset} ${log.dim}${message}${log.reset}`);
    }

    error(message) {
        this.log('error', message);
    }

    info(message) {
        this.log('info', message);
    }

    warn(message) {
        this.log('warn', message);
    }

    debug(message) {
        this.log('debug', message);
    }

    raw(message) {
        this.log('raw', message);
    }
}

module.exports = Logger;