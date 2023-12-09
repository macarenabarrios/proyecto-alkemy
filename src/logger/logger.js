import fs from 'fs/promises';
import path from 'path';

const logFile = path.join(process.cwd(), 'logs.log');

async function log(req, type, message) {
	const logMessage = `${new Date().toISOString()} - ${type} - ${req.method} ${req.url} - ${message}\n`;

    try {
        await fs.appendFile(logFile, logMessage);
    } catch (err) {
        console.error('Error al escribir en el archivo de registro:', err);
    }
}

function logAction(req,message) {
    log(req,'INFO:' ,message);
}

function logError(req,message) {
    log(req,'ERROR:', message);
}

export { logAction, logError };