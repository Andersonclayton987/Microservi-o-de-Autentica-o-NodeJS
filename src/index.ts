import express, { NextFunction, Request, Response } from 'express';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

//Configuração da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuração de rotas
app.use(statusRoute)
app.use(usersRoute)

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ foo: 'Sucesso total' });
});

//Inicialização do servidor
app.listen(3000, () => {
    console.log('Aplicação rodando na porta 3000!');
})


