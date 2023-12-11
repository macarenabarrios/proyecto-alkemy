import {recordUserActionRepository} from '../repositories/log-action.repository.js'



export const recordUserAction = async (action,userId) =>{
	console.log("record log service");
	await recordUserActionRepository.save(action,userId);

}


