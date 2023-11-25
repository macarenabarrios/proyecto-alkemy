import { db } from "../db/index-db.js";


const findAll = async () =>{
    const response = await db.User.findAll(
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
    const response = await db.User.findOne({
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

    await db.User.create(user);


}
const update = async (id,user) =>{
    await db.User.update(user,{
        where:{
            id:id
        }
    })
}

const deleteById = (id) =>{
    //TODO
}

export const userRepository = {findAll,findById,save,update,deleteById}