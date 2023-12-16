import {performBackup} from "../scheduled/backup.scheduled.js";

const executeBackup = async () => {
	await performBackup();
}

export const backupService = {executeBackup}