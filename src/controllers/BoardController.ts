import { Request, Response } from "express";
import { BoardModel } from "../models/BoardModel";
import { prisma } from "../libs/db";



const model = new BoardModel()


export class BoardController {

    async createBoard(req: Request, res: Response) {
        console.log(req.body)


        const infoFromUserLogged = req.session.user?.id
        
        
        try {
            if(infoFromUserLogged !== undefined) {
                console.log(infoFromUserLogged)
                const newBoard = await model.createBoard({
                    name: req.body.title,
                    description: req.body.description,
                    User: {
                        connect: {id: infoFromUserLogged}
                    }
                })

                if(newBoard.ok) {
                    
                    req.session.board = {id: Number(newBoard.data?.id)}
                    
              

                    res.status(200).redirect('/home')
                }
            }

            
        }

        catch(err: unknown) {
            console.log(err)
            res.status(500).send()
        }

        
        
    }

    async updateBoard(req: Request, res: Response) {
        console.log(req.body)

        try {
            const infoFromUserLogged = req.session.user?.id
            const id = Number(req.params.id)
    
            if(infoFromUserLogged !== undefined) {
    
                const updateBoard = await model.updateBoard({
                    name: req.body.title,
                    description: req.body.description,
                    User: {
                        connect: {
                            id: infoFromUserLogged
                        }
                    }
                }, id)
    
    
                res.status(200).send()
            }
        }

        catch(err: any) {
            res.status(500).redirect('/home')
        }
        

     

    }

    async changeStatusById(req: Request, res: Response) {

        try {
            const idBoard = req.session.board?.id
            const changes = await model.changeStatus(req.body.status, Number(idBoard))
            console.log(req.body)
            console.log(changes.data)
            res.status(200).send()
        }

        catch(err: any) {
            res.redirect('/home')
        } 
     
    }


    async getBoardById(req: Request, res: Response) {
        const board = await model.getBoardById(Number(req.params.id))

        req.session.board = {id: Number(board?.board?.id )}
        
    

        try {
            if(board?.board!== null && board?.board!== undefined && board.tasksByBord !== undefined && board.tasksByBord !== null ) {
                res.status(200).render('pages/boardPage', {
                    data: board.board,
                    task: board.tasksByBord,
                    taskDeleted: board.taskDeletedByBoard
                })
            }
        }

        catch(err: any) {
            res.status(500).send()
        }
    }

     
   
    async deleteBoardById(req: Request, res: Response) {
        const isBoardDeleted = await model.deleteBoard(Number(req.params.id))

        try {
            if(isBoardDeleted.ok) {
                res.status(200).send()
            }
        }

        catch(err: any) {
            {
                res.status(500).send()
            }
        }
    }
    

   
}