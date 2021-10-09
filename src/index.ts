import express, { NextFunction, Request, Response } from 'express';
import errorHandler from './middlewares/error-handler.middleware';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

//Configuração da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuração de rotas
app.use(statusRoute)
app.use(usersRoute)

//Configuração dos Handler de error
app.use(errorHandler)

//Inicialização do servidor
app.listen(3000, () => {
    console.log('Aplicação rodando na porta 3000!');
})


