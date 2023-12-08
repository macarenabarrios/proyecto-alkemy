import LogAction from "../db/models/user-action-log.model.js";


const save = async (action,userId) =>{
	const log = await LogAction.create({
		action:action,
		userId:userId
	})
	console.log(log)
}

export const recordUserActionRepository = {save}