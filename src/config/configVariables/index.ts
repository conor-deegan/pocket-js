import * as dotenv from 'dotenv';
dotenv.config();

export const configVariables = {
    NODE_ENV: process.env.NODE_ENV,
    DB_URI: process.env.DB_URI
};
