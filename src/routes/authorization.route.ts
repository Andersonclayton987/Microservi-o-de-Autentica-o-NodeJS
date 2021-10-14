import {NextFunction, Request, Response, Router} from "express";
import { buffer } from "stream/consumers";
import ForbiddenError from "../models/errors/ForbiddenError.model";
import userRepository from "../repositories/userrepository";
import  JWT from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";

const authorizationRoute = Router();
authorizationRoute.post('/token', basicAuthenticationMiddleware, async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const user = req.user;

        if(!user){
            throw new ForbiddenError('Usuário não informado')
        }
        const jwtPayload = {username:user.username}
        const jwtOptions ={subject: user?.uuid}
        const secretKey = 'my_secret_key'

        const jwt = JWT.sign(jwtPayload,secretKey,jwtOptions)
        res.status(StatusCodes.OK).json({token:jwt})
        

    } catch(error){
        next (error)
    }
});

export default authorizationRoute