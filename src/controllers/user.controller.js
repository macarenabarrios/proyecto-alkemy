import {userService} from "../services/user.service.js"



const getAll = (req,res,next) =>{

    userService.getAll().then((response)=>
    res.status(200).json(response)
    ).catch((err)=>{
        next(err)
    });

}
const getById = (req,res,next) =>{
    userService.getById(req.params.id).then((response)=>
        res.status(200).json(response)
    ).catch((err)=>{
        console.log(err)
        next(err)
    });

    
}
const save = (req,res,next) =>{
    userService.create(req.body)
    .then((response)=>{
        res.status(201).json()
    })
    .catch((err)=>{
        console.log(err)
        next(err)
    })

}
const update = (req,res,next) =>{
    userService.update(req.params.id,req.body)
    return res.status(204).json()
}

const deleteUser = (req,res,next) =>{

    userService.deleteActor(req.params.id)
    return res.status(204).json()
}

export {getAll,getById,save,update,deleteUser}
