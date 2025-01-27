import { Request, Response } from "express";
import { BoardModel } from "../models/BoardModel";
import { prisma } from "../libs/db";



const model = new BoardModel()


export class PageController {

    

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

    async renderProfilePage(req: Request, res: Response) {
        

        const id = req.session.user?.id

        try {
            const user = await prisma.user.findUnique({where: {id: id}})
            console.log(user)
            if(user !== null) {
                res.render('pages/profile', {
                    data: user
                })
            }

            else {throw new Error('This user is null')}
        }
        

        catch(error: unknown) {
            console.log(error)
            res.redirect('/home')
        }


     }

}

