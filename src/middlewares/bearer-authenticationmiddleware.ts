import { NextFunction, Response, Request } from "express";
import ForbiddenError from "../models/errors/ForbiddenError.model";
import JWT from "jsonwebtoken";
import userRepository from "../repositories/userrepository";



async function bearerAthenticationMiddleware(req: Request, res: Response, next:NextFunction){
    try{
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader){
            throw new ForbiddenError('Credenciais não informadas')
        }
        const [authenticationType, token] = authorizationHeader.split(' ')

        if(authenticationType !== 'Bearer' || !token){
            throw new ForbiddenError('Tipo de autenticação inválido')
        }

        const tokenPayload = JWT.verify(token, 'my_secret_key')

        if(typeof tokenPayload !== 'object' || tokenPayload.sub ){
            throw new ForbiddenError('Token Inválido')
        }
        
        const uuid = tokenPayload.sub
        const user = {uuid:tokenPayload.sub, username: tokenPayload.username}
        req.user = user
       next()
    }catch(error){
        next(error)
    }
}

export default bearerAthenticationMiddleware