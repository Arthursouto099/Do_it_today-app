import { Request, Response, NextFunction } from "express";


export function isLogged(req: Request, res: Response, next: NextFunction) {
    if(req.session.user) {
        return next()
    }

    res.redirect('/login')
}