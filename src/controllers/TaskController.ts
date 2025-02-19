import { Request, Response } from "express";
import { TaskModel } from "../models/TaskModel";
import { cache } from "ejs";

const model = new TaskModel()

export class TaskController {



    async createTask(req: Request, res: Response) {
        try {
            const newTask = await model.createTask({
                name: req.body.title,
                description: req.body.description,
                finalDate: req.body.finalDate,
                priority: req.body.priority,
                adm: {
                    connect: {id: Number(req.session.user?.id)}
                },
                board: {
                    connect: {id: Number(req.session.board?.id)}
                }
            })

            console.log(newTask)

         
            res.status(200).redirect('/board/getBoard/' + req.session.board?.id)
            
        }

        catch(err: any) {
            console.log(err)
            res.redirect('/home')
        }
    }


    async completeTask(req: Request, res: Response) {
        try {
            const taskCompleted = await model.completeTask(Number(req.params.id))
            if(taskCompleted.ok) {
                res.status(200).send()
            }
        }

        catch(err: any) {
            console.log(err)
            res.redirect('/home')
        }
    }


    async updateTask(req: Request, res: Response) {
        try {
            const taskUpdated = await model.updateTask({
                adm: {
                    connect: {
                        id: req.session.user?.id
                    }
                },
                board: {
                    connect: {
                        id: req.session.board?.id
                    }
                },
                name: req.body.title,
                description: req.body.description,
                finalDate: req.body.finalDate,
                priority: req.body.priority
            }, Number(req.params.id))

            console.log(taskUpdated)

            if(taskUpdated.ok) {
                res.status(200).send('Success')
            }
        }

        catch(err: any) {
            console.log(err)
            res.redirect('/home')
        }
    }
}