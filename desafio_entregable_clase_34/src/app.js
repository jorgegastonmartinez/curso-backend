import express from 'express';
import { addLogger } from './middleware/middlewareLogger.js';

import dotenv from 'dotenv';

const app = express();
const PORT = 8080;
dotenv.config();

app.use(addLogger);

app.get("/", (req, res) => {
    req.logger.debug('Debugging info');
    req.logger.http('HTTP request info');
    req.logger.info('General info');
    req.logger.warn('Warning message');
    req.logger.error('Error message');
    // req.logger.fatal('Fatal error');
    req.logger.log('fatal', 'Fatal error');

    res.send('Implementación de logger')
});

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
