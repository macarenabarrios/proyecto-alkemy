import {userRepository} from '../repositories/user.repository.js'


const getAll = async () =>{
    const response = await userRepository.findAll();
    return response;
}
const getById = async (id) =>{
    const user = await userRepository.findById(id)
    if(!user){
        throw new Error(`User doesn't exist with id ${id}`)
    }
    return user ;
}
const create = async (user) =>{
    try {
        await userRepository.save(user);
    } catch (error) {
        console.error(error);   
    }

}
const update = async (id,user) =>{
    await userRepository.update(id,user);
}
const deleteUser = async (id) =>{
    await userRepository.deleteById(id);
    
}
export const userService = {getAll,getById,create,update,deleteUser}