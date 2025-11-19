import express from 'express';
import { usuarioRoutes } from './Router/usuario_routes';
import { admRoutes } from './Router/adm_routes';

const app = express();

app.set('view engine', 'ejs');

app.set('views', './src/views');

app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.render('index', { message: 'Hello' });
});

app.use(usuarioRoutes);
app.use(admRoutes);

app.listen(3333, () => {
    console.log('Servidor rodando no endereço http://localhost:3333');
});
