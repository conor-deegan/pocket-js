import { logger } from '../../../utils/logger';
import { ErrorHandler } from './../../../utils/error';

const get = async (): Promise<void> => {
    try {
        logger.info('Hello world from inside the service!');
        return;
    } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
    }
};

export default get;
