import { Request, Response } from "express";
import { BoardModel } from "../models/BoardModel";
import { resolve } from "path";



const model = new BoardModel()


export class PageConrtoller {

    

    async renderRegisterPage(req: Request, res: Response) {
        res.render('pages/registerPage')
    }

    async renderHomePage(req: Request, res: Response) {
        const infoFromUserLogged = req.session.user?.id
        const data = await model.getAllBoardsFromUserId(Number(infoFromUserLogged))
        await new Promise(resolve => setTimeout(resolve, 2000))
        if(data !== null) {
            res.render('pages/homePage', {
                data: data.data
            })
        }
    }

    async renderLoginPage(req: Request, res: Response) {
        res.render('pages/loginPage', {
            errorMessage: null
        })
    }





}

