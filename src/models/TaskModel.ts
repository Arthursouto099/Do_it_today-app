import { Prisma } from "@prisma/client";
import { prisma } from "../libs/db";

export class TaskModel {

    private async updateQuantityTasks(id: number) {
        await prisma.board.update({
            where: {
                id: id
            },
            data: {
                amountOfTasks: {
                    increment: 1
                }
            }
        })
    }

    private async addTaskInTaskDeleteList(data: Prisma.TaskDeletedCreateInput) {
        await prisma.taskDeleted.create({data})
    }

    // private async updateCountInBoard(id: number) {
    //     await prisma.board.update({
    //     where: {id: id},
    //     data: {
    //         taskCount: {
    //             increment: 1
    //         }
    //     }

    //     })
    // }

    // private async decrementCountInBoard(id: number) {
    //     await prisma.board.update({
    //         where: {id: id},
    //         data: {
    //             taskCount:{
    //                 decrement: 1
    //             }
    //         }
    //     })
    // }

    

    private async completedTask(id: number) {
        await prisma.board.update({
            where: {
                id
            },
            data: {
                taskCompleted: {
                    increment: 1
                }
            }
        })
    }

    async updateTask(data: Prisma.TaskCreateInput, id: number) {
        try {
            const taskUpdated = await prisma.task.update({
                where: {id: id}, 
                data
            })

            return {
                data: taskUpdated,
                ok: true
            }
        }

        catch(error: any) {
            return {
                error,
                ok: false
            }
        }
    }



    async createTask(data: Prisma.TaskCreateInput) {
        try {
            const newTask = await prisma.task.create({data})

            await this.updateQuantityTasks(newTask.boardId)
            return {
                newTask
            }
        }

        catch(err: any) {
            return err
        }
    }


    async isCompleted(id: number) {
        const updateScoreUser = await prisma.user.update({
            where: {id: id},
            data: {
                score: {
                    increment: 50
                }
            }
        })
    }

    async completeTask(id: number) {
        try {
            const completeTask = await prisma.task.delete({where: {id: id}})
            await this.isCompleted(completeTask.userId) 
            await this.addTaskInTaskDeleteList({
                board: {
                    connect: {id: completeTask.boardId}
                },
                user: {
                    connect: {id: completeTask.userId}
                },
                name: completeTask.name,
                description: completeTask.description,
                finalDate: completeTask.finalDate,
                priority: completeTask.priority,
                
            })
            await this.completedTask(completeTask.boardId)
            
            return {
                completeTask,
                ok: true
            }
        }

        catch(err: any) {
            return {
                err,
                ok: true
            }
        }
    }


}