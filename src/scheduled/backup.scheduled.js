import cron from 'node-cron'
import path from 'path';
import { exec } from 'child_process';
import mysqldump from 'mysqldump'

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_HOST = process.env.DB_HOST

const today = new Date().toISOString().split("T")[0];

const dumpFileName = `${today}.dump.sql`;
const dumpFilePath = path.join(process.cwd(), dumpFileName);

const command = `mysqldump -u ${DB_USER} -p ${DB_PASS} -h ${DB_HOST} ${DB_NAME} > ${dumpFilePath}`;

const performBackup = async () => {

	try {
		// exec(command,(error, stdout, stderr) => {
		// 	if (error) {
		// 		console.error(`exec error: ${error}`);
		// 		return;
		// 	}
		// 	console.log(`stdout: ${stdout}`);
		// 	console.error(`stderr: ${stderr}`);
		// });
		await mysqldump({
      connection: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
      },
      dumpToFile: dumpFilePath,
    });
		console.log('Backup completado. Datos guardados en', dumpFilePath);
		return `Backup completado. Datos guardados en ${dumpFilePath}`;
	} catch (error) {
		console.error('Error al ejecutar el comando mysqldump:', error);
		throw error;
	}
}

const dbBackup = async () => {
	cron.schedule('0 0 */3 * *', async () => {
		console.log('Ejecutando respaldo automáticamente cada 3 días');
		const response = await performBackup();
		return response;
	})
};

export {dbBackup,performBackup};