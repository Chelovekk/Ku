import expressWinston from 'express-winston'
import winston from 'winston'

const format = winston.format;

const custom = format.printf((info) => {
    return `[${info.level}]: ${info.message} ${info.data ? JSON.stringify(info.data) : ''}`;
});

const loggerOpts = {
    transports: [new winston.transports.Console()],
    format: format.combine(
        format((info) => {
            info.level = info.level.toUpperCase();
            return info;
        })(),
        format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
        format.colorize(),
        custom
    ),
};

export const logger = expressWinston.logger(loggerOpts);
export const errorLogger = expressWinston.errorLogger(loggerOpts);
export const mainLogger = winston.createLogger(loggerOpts);
