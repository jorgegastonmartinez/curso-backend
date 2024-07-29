import express from 'express';
import { addLogger } from './middleware/middlewareLogger.js';
import { devLogger, prodLogger } from './utils/logger.js';

const logger = process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

import dotenv from 'dotenv';

const app = express();
const PORT = 8080;
dotenv.config();

app.use(addLogger);

app.use((err, req, res, next) => {
    req.logger.error(`Error en la ruta ${req.originalUrl}: ${err.message}`);
    res.status(500).send('Error interno del servidor');
});
app.use((req, res, next) => {
    if (req.method !== 'GET') {
        req.logger.warn(`Método ${req.method} no soportado en ${req.url}`);
    }
    next();
});

app.get("/loggerTest", (req, res) => {
    req.logger.debug('Información de depuración');
    req.logger.http('información de solicitud HTTP');
    req.logger.info('Información general');
    req.logger.warn('Mensaje de advertencia');
    req.logger.error('Se ha producido un error al conectar a la base de datos');
    // req.logger.fatal('Fatal error');
    req.logger.log('fatal', 'Fatal error');

    res.send('Implementación de logger')
});

app.listen(PORT, () => {
    logger.info(`Servidor escuchando en el puerto ${PORT}`);
});
