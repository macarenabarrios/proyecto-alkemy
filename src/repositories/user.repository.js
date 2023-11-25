import { User } from "../db/models/user.model.js";
import { Role } from "../db/models/role.model.js";

const findAll = async () =>{
    try {
        const response = await User.findAll(
            {
                attributes:{
                    exclude:['roleId']
                },
        include:[{
            model:Role,
            attributes: ['name']
        }],
        where:{
            isActive:true,
        }
    }
    );
    return response;
        
    } catch (error) {
        console.error('Error de Sequelize:', error.message);
        console.error('Error detallado:', error);
      }
    
}
const findById = async (id) =>{
    const response = await User.findOne({
        attributes:{
            exclude:['roleId']
        },
        include:[{
            model:Role,
            attributes: ['name']
        }],
        where:{
            id:id,
            isActive:true,
        },
    });
    return response;
}
const save = async (user) =>{
    const defaultRole = await Role.findOne({ where: { name: 'USER' } });
    const newUser = await User.create(user);
    await newUser.setRole(defaultRole);


}
const update = async (id,user) =>{
    await User.update(user,{
        where:{
            id:id
        }
    })
}

const deleteById = async (id) =>{
    await User.destroy({
        where: {
            id: id
          },
    });
}

export const userRepository = {findAll,findById,save,update,deleteById}