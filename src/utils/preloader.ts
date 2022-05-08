import 'tsconfig-paths/register';
import 'reflect-metadata';

import path from 'path';
import dotenv from 'dotenv';

if(process.env.NODE_ENV) {
    dotenv.config({ path: path.join(__dirname, '..', `.env.${process.env.NODE_ENV}`) });
}
dotenv.config({ path: path.join(__dirname, '..', `.env`) });

process.on('SIGINT', function () {
    process.exit(0);
});

export default dotenv;