import {Request, Response} from "express";
import {Usuario, getByEmail, inserir} from "../model/usuario";

export function show_login(req:Request,res:Response){
    res.render('login',{
        message:null
    });
}

export async function register(req:Request, res:Response) {
    const{nome, email, senha} = req.body;
    if(!nome || !email || !senha){
        return res.render('login', {
            message: {
                type:'error',
                value:'Preencha corretamente todos os dados!',
                title:'Dados inválidos'
            }
        });
    }

    const usuarioEncontrado = await getByEmail(email);

    if (usuarioEncontrado){
            return res.render('login', {
                message:{
                    type:'error',
                    value:'Email ja existe',
                    title:'Dados invalidos'
                }
            })
    }

    const usuario:Usuario = {
        nome,
        email,
        senha
    };
    await inserir(usuario);
    
    res.render('login',{
        message:{
            type:'sucess',
            value:'Usuario cadastrado com sucesso!',
            title: 'Sucesso'
        }
    });
}


