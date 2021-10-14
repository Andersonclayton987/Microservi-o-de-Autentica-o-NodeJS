import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/ForbiddenError.model";
import userRepository from "../repositories/userrepository";

async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction){
    try{
        const authorizationHeqaders =  req.headers['authorization'];

        if (!authorizationHeqaders){
            throw new ForbiddenError('Credenciais não informadas')
        }

        const [authenticationType, token] = authorizationHeqaders.split(' ')
        
        if(authenticationType !== 'Basic' || !token){
            throw new ForbiddenError('Tipo de autenticação inválido')
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8')

        const [username, password] = tokenContent.split(':')

        if (!username || !password){
            throw new ForbiddenError('Credenciais não preenchidas')
        }

        const user = await userRepository.findByUsernameAndPassword(username, password)

        if(!user){
            throw new ForbiddenError('Usuário ou senha inválidos!')
        }
        req.user = user;
        next()

    }catch (error){
        next(error)
    }

}
export default basicAuthenticationMiddleware;