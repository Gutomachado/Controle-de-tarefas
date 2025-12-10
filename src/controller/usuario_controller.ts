import {Request, Response} from "express";
import {Usuario, getByEmail, getbyEmailAndPassword, inserir} from "../model/usuario";

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

export async function login(req: Request, res: Response){
    const {email, senha} = req.body;

    if(!email || !senha){
        return res.render('login', {
            message: {
                type:'error',
                value:'Preencha corretamente todos os dados!🤬',
                title:'Dados inválidos'
            }
        });
    }

    const user = await getbyEmailAndPassword(email, senha);

    if(!user) {
        return res.render('login', {
            message: {
                type:'error',
                value:'E-mail ou senha incorretos',
                title:'Dados inválidos'
            }
        });
    }
        (req.session as any).user = {
            name:user.nome,
            email:user.email,
            id: user.id
        }    

        return res.redirect('/adm');
}

export async function logout(req: Request, res: Response) {
    req.session.destroy(() => {
        res.redirect('/usuario/login');
    });
}

export async function show_users(req: Request, res: Response) {
    const {user} = req.session as any;
    res.render('users', { user });
}