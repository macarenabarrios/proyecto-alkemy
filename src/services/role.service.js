import { roleRepository } from "../repositories/role.repository.js";



const findById = async (id) => {
	const response = await roleRepository.findById(id);
	return response;
}


export const roleService = {findById}