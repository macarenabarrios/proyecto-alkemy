import fs from 'fs/promises';
import path from 'path';

const infoLogFile = path.join(process.cwd(), 'info.log');
const errorLogFile = path.join(process.cwd(), 'error.log');

async function log(req, type, message) {
	const logMessage = `${new Date().toISOString()} - IP: ${getClientIP(req)} - ${type} - ${req.method} ${req.url} - ${message}\n`;

    try {
        type === "INFO" ?
          await fs.appendFile(infoLogFile, logMessage)
        : await fs.appendFile(errorLogFile,logMessage);
    } catch (err) {
        console.error('Error al escribir en el archivo de registro:', err);
    }
}
const getClientIP = (req) => {
    const forwardedFor = req.headers['x-forwarded-for'];
    if (forwardedFor) {
        const ips = forwardedFor.split(',');
        return ips[0].trim();
    } else {
        return req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    }
}

const logAction = (req,message) => {
    log(req,'INFO:' ,message);
}

const logError = (req,message) => {
    log(req,'ERROR:', message);
}

export { logAction, logError };