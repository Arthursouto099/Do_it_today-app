import { Request, Response } from "express";


export function notFound(req: Request, res: Response) {
    res.redirect('/home')
}