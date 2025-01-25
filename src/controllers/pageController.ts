import { Request, Response } from "express";
import { BoardModel } from "../models/BoardModel";
import { prisma } from "../libs/db";



const model = new BoardModel()


export class PageConrtoller {

    

    async renderRegisterPage(req: Request, res: Response) {
        res.render('pages/registerPage')
    }

    async renderHomePage(req: Request, res: Response) {
        const infoFromUserLogged = req.session.user?.id
        const infoUserById = await prisma.user.findUnique({where: {id: infoFromUserLogged}})

        const data = await model.getAllBoardsFromUserId(Number(infoFromUserLogged))

        await new Promise(resolve => setTimeout(resolve, 2000))
        if(data !== null && infoUserById !== null) {
            res.render('pages/homePage', {
                data: data.data,
                score: infoUserById.score
            
            })
        }
    }

    async renderLoginPage(req: Request, res: Response) {
        res.render('pages/loginPage', {
            errorMessage: null
        })
    }





}

