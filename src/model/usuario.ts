import { connect } from "http2";
import { Connection } from "pg";
import { connection } from "../infra/connection";
import { get } from "http";

export type Usuario = {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    created_at: string;
}

export async function inserir(usuario: Usuario) {
    
    await connection.query('INSERT INTO usuario(nome, email, senha) VALUES($1,$2,$3);',
    [
        usuario.nome,
        usuario.email,
        usuario.senha
    ]
);
}

export async function getByEmail(email:string){
    const{rows} = await connection.query('SELECT * FROM usuario Where email = $2',
        [email]
    );
    return rows[0];
    
}