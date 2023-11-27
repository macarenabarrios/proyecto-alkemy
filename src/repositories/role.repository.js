import  Role  from "../db/models/role.model.js";


const findByName = async (name) =>{
    const response = await Role.findOne({
        where:{
            name:name,
        },
    });
    return response;
}


export const roleRepository = {findByName}