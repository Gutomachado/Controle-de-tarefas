import {Router} from 'express';
import { show_adm } from '../controller/adm_controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { show_users } from '../controller/usuario_controller';

const admRoutes = Router() 

admRoutes.get('/adm', authMiddleware, show_adm);
admRoutes.get('/adm/users', authMiddleware, show_users);

export {
    admRoutes
}