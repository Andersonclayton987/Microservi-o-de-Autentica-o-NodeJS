//get / users 
//get / users/:uuid 
//post /users
//put/users/:uuid
//delete /users/:uuid 

import { NextFunction, Request, Response, Router } from "express";
import{StatusCodes} from 'http-status-codes';

//Busca todos os usuários
const usersRoute = Router();
usersRoute.get('/users', (req:Request, res: Response, next: NextFunction) =>{
    const users =[{userName: 'Anderson Clayton'}];
    res.status(StatusCodes.OK).send(users)
});

//Busca um usuário específico
usersRoute.get('users/:uuid', (req:Request<{uuid: string}>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    res.status(StatusCodes.OK).send({ uuid });
})

//Cria um usuário
usersRoute.post('/users', (req:Request, res: Response, next: NextFunction) =>{
    const newUser = req.body;
    res.status(StatusCodes.CREATED).send(newUser)
})

//Altera um usuário
usersRoute.put('/users/:uuid', (req:Request<{uuid: string}>, res: Response, next: NextFunction) =>{
    const uuid = req.params.uuid;
    const modifieUser = req.body
    res.status(StatusCodes.OK).send({uuid});

})

//Deleta um usuário
usersRoute.delete('/users/uuid', (req:Request<{uuid: string}>, res: Response, next: NextFunction) =>{
    res.status(StatusCodes.OK)
})

export default usersRoute;