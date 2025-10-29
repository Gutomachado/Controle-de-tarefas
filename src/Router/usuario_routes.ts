import {Router} from 'express';
import {  show_login, register } from '../controller/usuario_controller';

const usuarioRoutes = Router() 

usuarioRoutes.get('/usuario/login', show_login);
usuarioRoutes.post('/usuario/register', register);

export {
    usuarioRoutes
}