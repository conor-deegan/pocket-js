import { app } from './app';
import { configVariables } from './config/configVariables';
import { logger } from './utils/logger';

// Define port to run the server on
const PORT = process.env.PORT || 5000;

// Start the server
logger.info(`ENVIRONMENT: ${configVariables.NODE_ENV}`);
app.listen(PORT, () => logger.info(`SERVER_STARTED: ${PORT}`));
