import { Response } from 'express';

import { statusCodes } from './../../config/constants';

interface ErrorHandler {
    statusCode: number;
    message: string;
    name: string;
}

class ErrorHandler extends Error {
    constructor(statusCode: number, message: string) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (error: ErrorHandler, res: Response): Response => {
    let { statusCode, message } = error;
    if (!statusCode) {
        statusCode = statusCodes.SERVER_ERROR;
    }
    return res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
};

export { ErrorHandler, handleError };
