// Imports
import { json, urlencoded } from 'body-parser';
// import { connect } from './config/database';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';

import { configVariables } from './config/configVariables';
import { statusCodes } from './config/constants';
import { sampleRouter } from './routes/api/v1';
import { handleError } from './utils/error';
import { logger } from './utils/logger';
import { IErrorHandler } from './utils/types';

// Create application
const app: Application = express();

// // Connect to the DB
// connect(`${configVariables.DB_URI}`).then((db) => {
//     logger.info(`DB_CONNECTED: ${db}`);
// }).catch((err) => {
//     logger.error(`DB_CONNECT_ERROR: ${err.message}`);
// });

// Application config
app.use(helmet());
app.use(cors());

app.use((req, _res, next) => {
    logger.info(`ENDPOINT: ${req.method} ${req.url}`);
    next();
});

app.use(json({ limit: '50mb' }));

app.use(urlencoded({ extended: true, limit: '50mb' }));

app.use('/api/v1/sample', sampleRouter);

// Health check
app.get('/healthcheck', (req, res) => {
    res.status(statusCodes.SUCCESS).json({
        data: 'Health Check Passed',
        env: configVariables.NODE_ENV
    });
});

// Catch all
app.get('*', (req, res) => {
    res.status(statusCodes.NOT_FOUND).json({
        status: 'Catch All',
        service: 'api',
        env: configVariables.NODE_ENV
    });
});

// Error handling
app.use(
    (
        error: IErrorHandler,
        req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        logger.error(`ENDPOINT: ${req.method} ${req.url}`);
        logger.error(error.message);
        handleError(error, res);
    }
);

export { app };
