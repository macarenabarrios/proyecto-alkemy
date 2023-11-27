import { authService } from "../services/auth.service.js";



const login = (req,res,next)=>{
    
    const {email,password} = req.body;
    authService.authenticate(email,password)
    .then((response)=>
    res.status(200).json({accessToken:response})
    ).catch((err)=>{
        next(err)
    }); 

}


export {login}