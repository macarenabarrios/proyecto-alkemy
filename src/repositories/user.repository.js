import { User } from "../db/models/user.model.js";

const findAll = async () =>{
    const response = await User.findAll(
        {
        attributes:{
            exclude:['role_id']
        },
        include:[{
            model:db.Role,
            attributes: ['name']
        }],
        where:{
            isActive:true,
            deleted:false
        }
    }
    );
    return response;
}
const findById = async (id) =>{
    const response = await User.findOne({
        attributes:{
            exclude:['role_id']
        },
        include:[{
            model:db.Role,
            attributes: ['name']
        }],
        where:{
            id:id,
            isActive:true,
            deleted:false
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