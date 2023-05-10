import { NextFunction, Request, Response } from 'express';

import { sampleConstants, statusCodes } from '../../../config/constants';
import { ErrorHandler } from '../../../utils/error';
import { get as getService } from './../../../services/v1/sample.service';

const get = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | undefined> => {
    try {
        if (req.query.error) {
            throw new ErrorHandler(
                statusCodes.BAD_REQUEST,
                sampleConstants.NOT_FOUND
            );
        }
        await getService();
        return res.status(statusCodes.SUCCESS).json('Hello World');
    } catch (error) {
        next(error);
    }
};

export default get;
