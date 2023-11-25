import { User } from "../db/models/user.model.js";
import { Role } from "../db/models/role.model.js";

const findAll = async () =>{
    const response = await User.findAll(
        {
        attributes:{
            exclude:['roleId']
        },
        include:[{
            model: Role,
            attributes: ['name']
        }],
        where:{
            softDelete:true,
        }
    }
    );
    return response;
}

const findById = async (id) =>{
    const response = await User.findOne({
        attributes:{
            exclude:['roleId']
        },
        include:[{
            model: Role,
            attributes: ['name']
        }],
        where:{
            id:id,
            softDelete:true,

        },
    });
    return response;
}
const save = async (user) =>{

    await User.create(user);


}
const update = async (id,user) =>{
    await User.update(user,{
        where:{
            id:id
        }
    })
}

const deleteById = (id) =>{
    //TODO
}

export const userRepository = {findAll,findById,save,update,deleteById}