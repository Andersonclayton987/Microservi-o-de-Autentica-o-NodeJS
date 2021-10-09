//get / users 
//get / users/:uuid 
//post /users
//put/users/:uuid
//delete /users/:uuid 

import { NextFunction, Request, Response, Router } from "express";
import{StatusCodes} from 'http-status-codes';
import { DatabaseError } from "pg-protocol";
import userRepository from "../repositories/userrepository";

//Busca todos os usuários
const usersRoute = Router();

usersRoute.get('/users', async (req:Request, res: Response, next: NextFunction) =>{
    const users = await userRepository.findAllUser();
    res.status(StatusCodes.OK).send(users)
});

//Busca um usuário específico
usersRoute.get('/users/:uuid', async (req:Request<{uuid: string}>, res: Response, next: NextFunction) => {
    try{
        const uuid = req.params.uuid;
        const user = await userRepository.findById(uuid);
        res.status(StatusCodes.OK).send(user);

    }catch (error){
        next(error);
    }
})

//Cria um usuário
usersRoute.post('/users',async (req:Request, res: Response, next: NextFunction) =>{
    const newUser = req.body;
    const uuid = await userRepository.create(newUser)
    res.status(StatusCodes.CREATED).send(uuid)
})

//Altera um usuário
usersRoute.put('/users/:uuid', async (req:Request<{uuid: string}>, res: Response, next: NextFunction) =>{
    const uuid = req.params.uuid;
    const modifieUser = req.body
    
    modifieUser.uuid = uuid;
    await userRepository.update(modifieUser)
    res.status(StatusCodes.OK).send();

})

//Deleta um usuário
usersRoute.delete('/users/:uuid', async (req:Request<{uuid: string}>, res: Response, next: NextFunction) =>{
    const uuid = req.params.uuid;
    await userRepository.remove(uuid);
    res.status(StatusCodes.OK);
})

export default usersRoute;