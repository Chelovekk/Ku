import { createLogger, transports, format, addColors } from 'winston';
import Transport from 'winston-transport';
import 'winston-daily-rotate-file';
import env from "../../constants/env";


addColors({
    error: 'red',
    info: 'cyan',
    warn: 'yellow',
    debug: 'green'
});

export function rotatingLogger(filename: string, subdirectory: string = '') {
    return createLogger({
        exitOnError: true,
        transports: [
            new Transport({
                log(message: unknown    , callback: () => void) {
                    if (message instanceof Error) {
                        console.dir(message);
                    }
                }
            }),
            new (transports.DailyRotateFile)({
                level: 'debug',
                filename: filename + '.log',
                dirname: `./logs/${filename}`,
                datePattern: 'YYYY-MM-DD',
                maxFiles: '3d',
                format: format.combine(
                    format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                    format.json(),
                    format.errors({ stack: true }),
                ),
            }),
            new transports.Console({
                level: 'warn',
                format: format.combine(
                    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                    format.colorize(),
                    format.simple(),
                ),
            }),
        ],
    });
}

const logger = rotatingLogger('app');
export default logger;