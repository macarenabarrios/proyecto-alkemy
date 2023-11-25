import {userRepository} from '../repositories/user.repository.js'


const getAll = async () =>{
    const response = await userRepository.findAll();
    return response;
}

const getById = async (id) =>{
    const movie = await userRepository.findById(id)
    if(!movie){
        throw new Error(`Movie doesn't exist with id ${id}`)
    }
    return movie;
}

const create = async (movie) =>{
    await userRepository.save(movie);
}

const update = async (id,movie) =>{
    await userRepository.update(id,movie);
}
const deleteUser = async (id) =>{
    //todo
}
export const userService = {getAll,getById,create,update,deleteUser}