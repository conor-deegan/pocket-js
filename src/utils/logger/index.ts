import { createLogger, format, transports } from 'winston';

const transportType = new transports.Console({
    level: 'silly',
    format: format.combine(
        format.colorize(),
        format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
    )
});

if (process.env.NODE_ENV === 'test') {
    transportType.silent = true;
}

const logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.json()
    ),
    transports: transportType
});

export { logger };
