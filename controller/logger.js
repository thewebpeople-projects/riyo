var winston = require('winston');
module.exports = new winston.Logger({
    level: 'info',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({
            name: 'info-file',
            filename: 'filelog-info.log',
            level: 'info'
        }),
        new (winston.transports.File)({
            name: 'error-file',
            filename: 'filelog-error.log',
            level: 'error'
        })
    ]
});