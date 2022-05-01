import dotenv from 'dotenv';
import path from 'path';

if (process.env.NODE_ENV) {
    dotenv.config({path: path.join(__dirname, '..', `.env.${process.env.NODE_ENV}`)});
}

dotenv.config({path: path.join(__dirname, '..', `.env`)});

interface IEnv {
    API_KEY: string
    DISCORD_BOT_TOKEN: string;
    DISCORD_TEXT_CHANNEL_ID: string

    STRIPE_SECRET_KEY: string,
    PRODUCT_DEFAULT_PRICE: string,

    PORT: string

    TG_TOKEN: string;
    TG_GROUP_ID: string;

    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    DB_LOGGING: string;

    REDIS_HOST: string;
    REDIS_PORT: string;
    REDIS_DB: number;
    REDIS: {
        KEY: {
            TELEGRAM_CANCEL_NOTIFICATIONS: string;
            OPENSEA_COLLECTIONS_SLUGS: string;
            COLLECTIONS_TEMP: string;
        },
    };


}

function assignEnv(propertyName: string): string {
    const value = process.env[propertyName];

    if (value) {
        return value;
    }
    throw new Error(`Env property not found: ${propertyName}`);
}

function assignEnvOptional(propertyName: string): string | undefined;
function assignEnvOptional<T = any>(propertyName: string, defaultValue: T): string | T;
function assignEnvOptional(propertyName: string, defaultValue?: any): string | any {
    return process.env[propertyName] ?? defaultValue;
}


// function assignEnvOptional(propertyName: string): string | undefined;
// function assignEnvOptional<T = any>(propertyName: string, defaultValue: T): string | T;
// function assignEnvOptional(propertyName: string, defaultValue?: any): string | any {
//     return process.env[propertyName] ?? defaultValue;
// }

const env: IEnv = {
    API_KEY: assignEnv('API_KEY'),
    DISCORD_BOT_TOKEN: assignEnv('DISCORD_BOT_TOKEN'),
    DISCORD_TEXT_CHANNEL_ID: assignEnv('DISCORD_TEXT_CHANNEL_ID'),

    STRIPE_SECRET_KEY: assignEnv('STRIPE_SECRET_KEY'),
    PRODUCT_DEFAULT_PRICE: assignEnv('PRODUCT_DEFAULT_PRICE'),
    PORT: assignEnv('PORT'),

    TG_TOKEN: assignEnv('TG_TOKEN'),
    TG_GROUP_ID: assignEnv('TG_GROUP_ID'),

    DB_HOST: assignEnv('DB_HOST'),
    DB_PORT: assignEnv('DB_PORT'),
    DB_USERNAME: assignEnv('DB_USERNAME'),
    DB_PASSWORD: assignEnv('DB_PASSWORD'),
    DB_DATABASE: assignEnv('DB_DATABASE'),
    DB_LOGGING: assignEnv('DB_LOGGING'),
    REDIS_HOST: assignEnv('REDIS_HOST'),
    REDIS_PORT: assignEnv('REDIS_PORT'),
    REDIS_DB: +assignEnvOptional<number>('REDIS_DB', 0),
    REDIS: {
        KEY: {
            TELEGRAM_CANCEL_NOTIFICATIONS: 'telegram:subscription:cancel',
            OPENSEA_COLLECTIONS_SLUGS: 'telegram:',
            COLLECTIONS_TEMP: ''
        },
    },
};

export default {
    ...env,
};
