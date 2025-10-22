import {Pool} from "pg";

export const connection = new Pool({
    host:'localhost: 3333',
    user:'postgres',
    password:'1234',
    database: 'controle-de-tarefas'
});