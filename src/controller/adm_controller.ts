import { Request, Response } from "express";

export async function show_adm(req: Request, res: Response){
    res.render('adm');
}