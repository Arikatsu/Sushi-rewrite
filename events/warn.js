const Logger = require('./../utils/logger')
const c = new Logger()

module.exports = {
    name: 'warn',
    execute(warning) {
        c.warn(warning, __filename);
    }
}